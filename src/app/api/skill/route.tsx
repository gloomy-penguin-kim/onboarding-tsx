import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {  
    const skills = await prisma.skill.findMany({
        orderBy: {
            value: "asc", 
        }
    })  

    return NextResponse.json(skills, { status: 201 })

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    )
  }
}