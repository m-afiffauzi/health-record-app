import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patient = await prisma.patient.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(patient);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const json = await request.json();

  const updated = await prisma.patient.update({
    where: { id: Number(params.id) },
    data: {
      name: json.name || null,
      nik: json.nik || null,
      birthday: json.birthday || null,
      address: json.address || null,
    },
  });
  return new NextResponse(JSON.stringify(updated), { status: 201 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const json = await request.json();

  const updated = await prisma.patient.update({
    where: { id: Number(params.id) },
    data: json,
  });
  return new NextResponse(JSON.stringify(updated), { status: 201 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = await prisma.patient.delete({
    where: { id: Number(params.id) },
  });
  return new NextResponse(JSON.stringify(deleted), { status: 201 });
}
