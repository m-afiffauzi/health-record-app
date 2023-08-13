import { NextResponse } from "next/server";
import { prisma } from "../../libs/prisma";

export async function GET(request: Request) {
  const patients = await prisma.patient.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return NextResponse.json(patients);
}
export async function POST(request: Request) {
  const json = await request.json();

  const created = await prisma.patient.create({
    data: json,
  });
  return new NextResponse(JSON.stringify(created), { status: 201 });
}
