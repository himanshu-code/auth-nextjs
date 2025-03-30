import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbconfig/dbconfig";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password ");
    console.log("userData", user);
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
