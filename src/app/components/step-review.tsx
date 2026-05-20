import type { Role, Skill } from "./types";

type ReviewStepProps = {
    idNumber: string;
    lastSubmittedAt?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    bio: string;
    goals: string[];
    skills: string[];
    roles: Role[];
    allSkills: Skill[];
};

export function ReviewStep({
    idNumber,
    lastSubmittedAt,
    firstName,
    lastName,
    email,
    roleId,
    bio,
    goals,
    skills,
    roles,
    allSkills,
}: ReviewStepProps) {
    const roleName =
        roles.find((role) => role.id === roleId)?.value ?? "No role selected";

    const selectedSkillNames = skills
        .map((id) => allSkills.find((skill) => skill.id === id)?.value)
        .filter(Boolean);

    const formattedLastSubmittedAt = lastSubmittedAt
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
        }).format(new Date(lastSubmittedAt))
    : "Not submitted yet";

    return (
        <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
            <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="text-sm font-medium text-slate-500">ID Number</span>
                    <span className="text-sm text-slate-900">
                        {idNumber || "None Entered"}
                    </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="text-sm font-medium text-slate-500">Last Submitted</span>
                    <span className="text-sm text-slate-900">
                        {formattedLastSubmittedAt}
                    </span>
                </div> 
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="text-sm font-medium text-slate-500">Name</span>
                    <span className="text-sm text-slate-900">
                        {firstName && lastName ? `${firstName} ${lastName}` : "None Entered"}
                    </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="text-sm font-medium text-slate-500">Email</span>
                    <span className="text-sm text-slate-900">
                        {email || "None Entered"}
                    </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="text-sm font-medium text-slate-500">Role</span>
                    <span className="text-sm text-slate-900">
                        {roleName || "None Entered"}
                    </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="text-sm font-medium text-slate-500">Bio</span>
                    <span className="text-sm text-slate-900">
                        {bio || "None Entered"}
                    </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="text-sm font-medium text-slate-500">Goals</span>
                    <span className="text-sm text-slate-900">
                        {goals.length == 0 ? "None Entered" : (
                            <ul className="list-disc pl-6">
                                {goals.map((goal) => (
                                    <li key={goal}>
                                        {goal}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="text-sm font-medium text-slate-500">Skills</span>
                    <span className="text-sm text-slate-900">
                        {selectedSkillNames.length > 0
                            ? selectedSkillNames.join(", ")
                            : "None selected"}
                    </span>
                </div>

            </div>
        </div>
    );
}