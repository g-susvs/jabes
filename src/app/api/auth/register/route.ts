import { dbConnect } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {v4} from "uuid";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  const salt = bcrypt.genSaltSync(10);
  const passwordEncripted = bcrypt.hashSync(body.password, salt);

  const dataToCreateUser = {
    userId: v4(),
    name: body.name,
    email: body.email,
    password: passwordEncripted,
  };
  const user = await User.create(dataToCreateUser);

  return NextResponse.json(user, { status: 201 });
}
