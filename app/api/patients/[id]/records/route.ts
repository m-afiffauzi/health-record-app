import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const records = await prisma.record.findMany({
    where: {
      patientId: Number(params.id),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(records);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const json = await request.json();

  const created = await prisma.record.create({
    data: { ...json, patientId: Number(params.id) },
  });
  return new NextResponse(JSON.stringify(created), { status: 201 });
}
