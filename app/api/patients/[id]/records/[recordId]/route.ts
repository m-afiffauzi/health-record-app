import { NextResponse } from "next/server";
import { prisma } from "../../../../../libs/prisma";

export async function GET(
  request: Request,
  { params: { id, recordId } }: { params: { id: string; recordId: string } }
) {
  const record = await prisma.record.findFirst({
    where: {
      id: Number(recordId),
      patientId: Number(id),
    },
  });
  return NextResponse.json(record);
}

export async function PUT(
  request: Request,
  { params: { id, recordId } }: { params: { id: string; recordId: string } }
) {
  const json = await request.json();

  const updated = await prisma.record.update({
    where: { id: Number(recordId), patientId: Number(id) },
    data: {
      weight: json.weight || null,
      height: json.height || null,
      bloodPressure: json.bloodPressure || null,
      bloodSugarLevel: json.bloodSugarLevel || null,
      note: json.note || null,
    },
  });
  return new NextResponse(JSON.stringify(updated), { status: 201 });
}

export async function PATCH(
  request: Request,
  { params: { id, recordId } }: { params: { id: string; recordId: string } }
) {
  const json = await request.json();

  const updated = await prisma.record.update({
    where: { id: Number(recordId), patientId: Number(id) },
    data: json,
  });
  return new NextResponse(JSON.stringify(updated), { status: 201 });
}

export async function DELETE(
  request: Request,
  { params: { id, recordId } }: { params: { id: string; recordId: string } }
) {
  const deleted = await prisma.record.delete({
    where: { id: Number(recordId), patientId: Number(id) },
  });
  return new NextResponse(JSON.stringify(deleted), { status: 201 });
}
