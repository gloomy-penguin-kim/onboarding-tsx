import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ idNumber: string }> }
) {
    const { idNumber } = await params;

    const employee = await prisma.employee.findUnique({
        where: {
            idNumber,
        },
        include: {
            role: true,
            goals: true,
            skills: {
                include: {
                    skill: true,
                },
            },
        },
    });

    if (!employee) {
        return Response.json(
            { error: "Employee not found." },
            { status: 404 }
        );
    }

    return Response.json({
        id: employee.id,
        idNumber: employee.idNumber,
        lastSubmittedAt: employee.lastSubmittedAt,
        currentStep: employee.currentStep,
        completed: employee.completed,

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
}