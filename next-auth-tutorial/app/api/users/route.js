import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";


export const POST = async (req) => {
    try {
        const body = await req.json();
        const userData = body.formData;

        // Confirm data exists
        if (!userData?.email || !userData.password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Check for duplicate emails
        const duplicate = await User.findOne({ email: userData.email }).lean().exec();

        if (duplicate) {
            return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
        }

        const hashPassword = await bcrypt.hash(userData.password, 12);
        userData.password = hashPassword;

        await User.create(userData);

        return NextResponse.json({ message: "User Crested." }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    };
};
