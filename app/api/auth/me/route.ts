import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import User from "@/models/User";
import { getAdminFromRequest } from "@/utils/auth";

export async function GET(request: Request) {
  try {
    const decoded = await getAdminFromRequest(request);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    let user = null;

    try {
      await connectToDatabase();
      if (decoded.id && decoded.id !== "admin-default-id") {
        user = await User.findById(decoded.id).select("-password");
      }
      if (!user && decoded.email) {
        user = await User.findOne({
          email: { $in: [decoded.email, "abhilasha558@gmail.com", "admin@abhilasha.org"] },
        }).select("-password");
      }
    } catch (dbErr) {
      console.warn("DB connection issue during /api/auth/me check:", dbErr);
    }

    // Fallback profile payload from decoded JWT token
    const userPayload = user ? user.toObject() : {
      _id: decoded.id || "admin-default-id",
      id: decoded.id || "admin-default-id",
      name: decoded.name || "Super Administrator",
      email: decoded.email || "abhilasha558@gmail.com",
      mobile: decoded.mobile || "+91 9956789374",
    };

    return NextResponse.json({ user: userPayload });
  } catch (error: any) {
    console.error("Get Profile Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

