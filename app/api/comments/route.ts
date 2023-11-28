import authOptions from "@/app/auth/authOptions";
import { commentSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = commentSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newComment = await prisma.comment.create({
    data: {
      description: body.description,
      userId: session.user.id,
      issueId: body.issueId,
    },
  });
  return NextResponse.json(newComment, { status: 201 });
};
