import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 6;
        const skip = (page - 1) * limit;

        const services = await Service.find({})
            .skip(skip)
            .limit(limit);

        const total = await Service.countDocuments({});
        const totalPages = Math.ceil(total / limit);

        console.log(`Services GET - Page: ${page}, Limit: ${limit}, Count: ${services.length}, Total: ${total}`);
        return NextResponse.json({
            services,
            currentPage: page,
            totalPages,
            totalServices: total
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await auth();
        console.log("Services POST - Session:", !!session, "Role:", session?.user?.role);

        // Admin or Staff role check
        if (!session || (session.user.role !== "admin" && session.user.role !== "staff")) {
            return NextResponse.json({ error: "Unauthorized. Admin or Staff access required." }, { status: 403 });
        }

        const body = await req.json();
        console.log("Services POST - Data:", body.name);
        await dbConnect();

        const service = await Service.create(body);
        console.log("Services POST - Success:", service._id);
        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
