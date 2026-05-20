// src/app/api/onboarding/route.ts

import { NextRequest, NextResponse } from "next/server"

import { employeeDraftSchema } from "@/app/onboarding/schema";
 
import { prisma } from "@/lib/prisma" 

export async function POST(request: Request) {
  const body = await request.json(); 
  

  const idNumber = String(body.idNumber ?? "").trim();

  if (!idNumber) {
    return Response.json(
      { error: "Employee ID Number is required." },
      { status: 400 }
    );
  }

  const existingEmployee = await prisma.employee.findUnique({
    where: { idNumber },
  });

  if (existingEmployee) {
    return Response.json(
      {
        error: "Employee ID Number already exists.",
        employeeId: existingEmployee.id,
      },
      { status: 409 }
    );
  }

  const employee = await prisma.employee.create({
    data: {
      idNumber,
      currentStep: 1,
      completed: false,
    },
  });

  return Response.json(employee, { status: 201 });
}
 