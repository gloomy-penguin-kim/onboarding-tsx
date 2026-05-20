// src/app/api/onboarding/route.ts

import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {  
    const roles = await prisma.role.findMany({
        orderBy: {
            value: "asc", 
        }
    })  

    return NextResponse.json(roles, { status: 201 })

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 500 }
    )
  }
}