import { prisma } from "@/lib/prisma"; 
import { employeeDraftSchema } from "@/app/schema";
import { Prisma } from "@/generated/prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json(); 

  const result = employeeDraftSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Invalid employee data.",
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = result.data;

  try {
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        idNumber: data.idNumber,
        currentStep: data.currentStep,
        completed: data.completed ?? false,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        email: data.email || null,
        bio: data.bio || null,
        roleId: data.roleId || null,
        lastSubmittedAt: data.completed ? new Date() : undefined,
        goals: {
          deleteMany: {},
          create: (data.goals ?? [])
            .filter((goal: string) => goal.trim() !== "")
            .map((goal: string) => ({ goal })),
        },
        skills: {
          deleteMany: {},
          create: (data.skills ?? []).map((skillId) => ({
            skill: { connect: { id: skillId } },
          })),
        },
      },
      include: {
        role: true,
        goals: true,
        skills: { include: { skill: true } },
      },
    });

    return Response.json({
      id: employee.id,
      idNumber: employee.idNumber,
      currentStep: employee.currentStep,
      completed: employee.completed,
      lastSubmittedAt: employee.lastSubmittedAt,
      firstName: employee.firstName ?? "",
      lastName: employee.lastName ?? "",
      email: employee.email ?? "",
      roleId: employee.roleId ?? "",
      bio: employee.bio ?? "",
      goals: employee.goals.map((item) => item.goal),
      skills: employee.skills.map((item) => ({
        id: item.skill.id,
        value: item.skill.value,
      })),
    });

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return Response.json(
        { error: "That email is already in use by another employee." },
        { status: 409 }
      );
    }
    throw error;
  }
}