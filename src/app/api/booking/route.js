import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { auth } from "@/auth";

export async function POST(req) {
    try {
        const body = await req.json();
        await dbConnect();

        const booking = await Booking.create(body);

        // Send Email Invoice via Nodemailer
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const emailContent = `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #4f46e5;">Care.xyz Booking Invoice</h1>
                    <p>Thank you for choosing Care.xyz! Your booking has been received.</p>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
                        <p><strong>Service:</strong> ${body.serviceId}</p>
                        <p><strong>Duration:</strong> ${body.duration} hours</p>
                        <p><strong>Total Cost:</strong> $${body.totalCost}</p>
                        <p><strong>Location:</strong> ${body.location.address}, ${body.location.area}, ${body.location.city}</p>
                        <p><strong>Status:</strong> Pending Confirmation</p>
                    </div>
                    <p>We will contact you shortly to confirm the details.</p>
                </div>
            `;

            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await transporter.sendMail({
                    from: '"Care.xyz Support" <no-reply@care.xyz>',
                    to: body.email,
                    subject: `Booking Invoice: ${body.serviceId}`,
                    html: emailContent,
                });
                console.log("Email sent successfully to:", body.email);
            } else {
                console.log("Skipping email: EMAIL_USER or EMAIL_PASS not set.");
            }

        } catch (emailErr) {
            console.error("Email sending failed:", emailErr);
            // Don't fail the booking if email fails
        }

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error("POST /api/booking - Error saving booking:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userIdParam = searchParams.get("userId");
        const session = await auth();

        // 1. Mandatory Session Check
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        let query = {};
        if (session.user.role === "admin") {
            // Admins can see all or filter by a specific user if userIdParam is provided
            if (userIdParam && userIdParam !== "undefined") {
                query = { userId: userIdParam };
            }
        } else {
            // Regular users are FORCED to only see their own records from session.user.id
            query = { userId: session.user.id };
        }

        console.log(`GET /api/booking - Role: ${session.user.role}, Query: ${JSON.stringify(query)}`);

        const bookings = await Booking.find(query).sort({ createdAt: -1 });
        console.log("GET /api/booking - Count:", bookings.length);

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("GET /api/booking - Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const bookingId = searchParams.get("id");
        const session = await auth();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!bookingId) {
            return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
        }

        await dbConnect();
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        // Ownership check
        if (booking.userId !== session.user.id && session.user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden. You can only cancel your own bookings." }, { status: 403 });
        }

        await Booking.findByIdAndDelete(bookingId);
        return NextResponse.json({ message: "Booking cancelled successfully" });
    } catch (error) {
        console.error("DELETE /api/booking - Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
