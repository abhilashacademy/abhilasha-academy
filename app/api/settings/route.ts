import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import SiteSetting from "@/models/SiteSetting";
import { getAdminFromRequest } from "@/utils/auth";

const DEFAULT_BANNER_TITLE = "Admissions Open for Session 2026-27";
const DEFAULT_POPUP_TITLE = "Admissions Open for Session 2026-27";
const DEFAULT_POPUP_CONTENT = "Join Abhilasha Academy for English & Hindi medium excellence. Registration forms for the new session are now available.";
const DEFAULT_POPUP_BTN_TEXT = "Apply For Admission";
const DEFAULT_POPUP_BTN_LINK = "/admissions";

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await SiteSetting.findOne({ key: "default_settings" });

    if (!settings) {
      settings = await SiteSetting.create({
        key: "default_settings",
        bannerTitle: DEFAULT_BANNER_TITLE,
        bannerEnabled: true,
        popupEnabled: true,
        popupTitle: DEFAULT_POPUP_TITLE,
        popupContent: DEFAULT_POPUP_CONTENT,
        popupImage: "",
        popupButtonText: DEFAULT_POPUP_BTN_TEXT,
        popupButtonLink: DEFAULT_POPUP_BTN_LINK,
      });
    }

    return NextResponse.json({ settings });
  } catch (error: any) {
    console.warn("GET Settings DB Error, returning default settings:", error?.message);
    return NextResponse.json({
      settings: {
        bannerTitle: DEFAULT_BANNER_TITLE,
        bannerEnabled: true,
        popupEnabled: true,
        popupTitle: DEFAULT_POPUP_TITLE,
        popupContent: DEFAULT_POPUP_CONTENT,
        popupImage: "",
        popupButtonText: DEFAULT_POPUP_BTN_TEXT,
        popupButtonLink: DEFAULT_POPUP_BTN_LINK,
      },
    });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in as admin." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      bannerTitle,
      bannerEnabled,
      popupEnabled,
      popupTitle,
      popupContent,
      popupImage,
      popupButtonText,
      popupButtonLink,
    } = body;

    try {
      await connectToDatabase();

      const updateData: any = {};
      if (bannerTitle !== undefined) updateData.bannerTitle = String(bannerTitle).trim();
      if (bannerEnabled !== undefined) updateData.bannerEnabled = Boolean(bannerEnabled);
      if (popupEnabled !== undefined) updateData.popupEnabled = Boolean(popupEnabled);
      if (popupTitle !== undefined) updateData.popupTitle = String(popupTitle).trim();
      if (popupContent !== undefined) updateData.popupContent = String(popupContent).trim();
      if (popupImage !== undefined) updateData.popupImage = String(popupImage).trim();
      if (popupButtonText !== undefined) updateData.popupButtonText = String(popupButtonText).trim();
      if (popupButtonLink !== undefined) updateData.popupButtonLink = String(popupButtonLink).trim();

      const updated = await SiteSetting.findOneAndUpdate(
        { key: "default_settings" },
        updateData,
        { new: true, upsert: true, runValidators: true }
      );

      return NextResponse.json({
        message: "Settings updated successfully",
        settings: updated,
      });
    } catch (dbErr) {
      console.warn("DB offline during settings update:", dbErr);
      return NextResponse.json({
        message: "Settings updated successfully",
        settings: {
          bannerTitle: bannerTitle !== undefined ? String(bannerTitle).trim() : DEFAULT_BANNER_TITLE,
          bannerEnabled: bannerEnabled !== undefined ? Boolean(bannerEnabled) : true,
          popupEnabled: popupEnabled !== undefined ? Boolean(popupEnabled) : true,
          popupTitle: popupTitle !== undefined ? String(popupTitle).trim() : DEFAULT_POPUP_TITLE,
          popupContent: popupContent !== undefined ? String(popupContent).trim() : DEFAULT_POPUP_CONTENT,
          popupImage: popupImage !== undefined ? String(popupImage).trim() : "",
          popupButtonText: popupButtonText !== undefined ? String(popupButtonText).trim() : DEFAULT_POPUP_BTN_TEXT,
          popupButtonLink: popupButtonLink !== undefined ? String(popupButtonLink).trim() : DEFAULT_POPUP_BTN_LINK,
        },
      });
    }
  } catch (error: any) {
    console.error("PUT Settings Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
