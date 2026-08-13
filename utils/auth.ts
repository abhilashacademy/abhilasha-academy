import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "abhilasha_super_secret_jwt_key_2026";

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getAdminFromRequest(req?: Request | NextRequest): Promise<any> {
  try {
    let token = "";

    // 1. Try to get token from Authorization header if req is provided
    if (req && req.headers) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    // 2. Try to get token from Next.js cookies store
    if (!token) {
      try {
        const cookieStore = await cookies();
        const cookie = cookieStore.get("token");
        if (cookie) {
          token = cookie.value;
        }
      } catch (e) {
        // Ignored if outside next headers scope
      }
    }

    // 3. Fallback: Parse raw cookie header if req is provided
    if (!token && req && req.headers) {
      const cookieHeader = req.headers.get("cookie");
      if (cookieHeader) {
        const parsed = cookieHeader.split(";").reduce((acc, c) => {
          const parts = c.trim().split("=");
          const key = parts[0]?.trim();
          const val = parts.slice(1).join("=").trim();
          if (key) acc[key] = val;
          return acc;
        }, {} as Record<string, string>);
        token = parsed["token"] || "";
      }
    }

    if (!token) return null;

    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    return null;
  }
}
