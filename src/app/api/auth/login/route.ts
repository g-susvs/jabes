import { dbConnect } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateJWT } from "@/shared/helpers/generate-jwt";

export async function POST(request: Request) {
  await dbConnect();
  const { email, password } = await request.json();

  const userExist = await User.findOne({ email });
  if (!userExist)
    return NextResponse.json({ error: "bad credentials" }, { status: 403 });

  const passwordValid = bcrypt.compareSync(password, userExist.password);
  if (!passwordValid)
    return NextResponse.json({ error: "bad credentials" }, { status: 403 });

  const token = await generateJWT(userExist.userId);

  return NextResponse.json({ success: true, data: { token } }, { status: 201 });
}
