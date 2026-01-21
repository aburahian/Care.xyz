import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const session = await auth();
        console.log("Admin Users GET - Session:", !!session, "Role:", session?.user?.role);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
        }

        await dbConnect();
        const users = await User.find({}).select("-password");
        console.log("Admin Users GET - Count:", users.length);
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await auth();
        console.log("Admin Users POST - Session:", !!session, "Role:", session?.user?.role);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
        }

        const body = await req.json();
        const { name, email, password, nid, contact, role } = body;
        console.log("Admin Users POST - Data:", { name, email, role });

        if (!name || !email || !password || !nid || !contact) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            nid,
            contact,
            role: role || "user",
        });

        console.log("Admin Users POST - Success:", newUser._id);

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { id, role } = body;

        if (!id || !role) {
            return NextResponse.json({ error: "ID and role are required" }, { status: 400 });
        }

        await dbConnect();
        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        if (id === session.user.id) {
            return NextResponse.json({ error: "You cannot delete yourself" }, { status: 400 });
        }

        await dbConnect();
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
