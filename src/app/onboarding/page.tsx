"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { EmployeeLookupStep } from "./components/step-employee-lookup";
import { EmployeeInfoStep } from "./components/step-employee-info";
import { BioStep } from "./components/step-bio";
import { GoalsStep } from "./components/step-goals";
import { SkillsStep } from "./components/step-skills";
import { ReviewStep } from "./components/step-review";
import { OnboardingNav } from "./components/onboarding-nav";

import type { Role, Skill } from "./components/types";
import { OnboardingBreadcrumb } from "./components/oboarding-breadcrumbs";

import { employeeDraftSchema, employeeOnboardingSchema } from "./schema";
import { z } from "zod";
import { FinishedStep } from "./components/step-finished";

export default function OnboardingPage() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [employeeId, setEmployeeId] = useState<string | null>(null);

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const [idNumber, setIdNumber] = useState("");
    
    const [lastSubmittedAt, setLastSubmittedAt] = useState<string | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [roleId, setRoleId] = useState("");
    const [bio, setBio] = useState("");

    const [goals, setGoals] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);

    const [roles, setRoles] = useState<Role[]>([]);
    const [allSkills, setAllSkills] = useState<Skill[]>([]);

    const progress = (step / 5) * 100;

    useEffect(() => {
        const savedEmployeeId = localStorage.getItem("employeeId");

        if (savedEmployeeId) {
            setEmployeeId(savedEmployeeId);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
        fetchSkills();
    }, []);

    async function fetchRoles() {
        const response = await fetch("/api/role");
        const data = await response.json();

        setRoles(data);
    }

    async function fetchSkills() {
        const response = await fetch("/api/skill");
        const data = await response.json();

        setAllSkills(data);
    }

    function zodErrorsToRecord(error: z.ZodError) {
        const nextErrors: Record<string, string> = {};
        for (const issue of error.issues) {
            const field = issue.path[0];

            if (typeof field === "string") {
                nextErrors[field] = issue.message;
            }
        }
        return nextErrors;
    }


    function loadEmployeeIntoForm(employee: any) {
        setEmployeeId(employee.id);
        setIdNumber(employee.idNumber ?? "");

        setFirstName(employee.firstName ?? "");
        setLastName(employee.lastName ?? "");
        setEmail(employee.email ?? "");

        setRoleId(employee.roleId ?? "");
        setBio(employee.bio ?? "");

        setGoals(employee.goals?.filter((g: any) => !!g) ?? []);

        setSkills(
            employee.skills?.map((skill: any) => skill.id) ?? []
        );
        
        setLastSubmittedAt(employee.lastSubmittedAt ?? null);

        localStorage.setItem("employeeId", employee.id);

        setStep(employee.currentStep ?? 1);
    }

    async function createNewEmployee() {
        try {
            setLoading(true);

            const response = await fetch("/api/employee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idNumber,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Create employee failed:", data);
                return;
            }

            loadEmployeeIntoForm(data);
            setStep(1);
            setErrors({});
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function loadExistingEmployee() {
        try {
            setLoading(true);

            const response = await fetch(
                `/api/employee/by-id-number/${encodeURIComponent(idNumber)}`
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("Load employee failed:", data);
                return;
            }

            console.log("Loaded employee:", data);
            loadEmployeeIntoForm(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function continueStep() {
        if (!employeeId) {
            console.error("No employee loaded.");
            return;
        }

        setGoals(goals.filter((g) => !!g));

        const payload = {
            idNumber,
            currentStep: step + 1,
            completed: false,
            firstName,
            lastName,
            email,
            roleId,
            bio,
            goals,
            skills,
        };

        const result = employeeDraftSchema.safeParse(payload);

        if (!result.success) {
            console.log("Updating employee with:", zodErrorsToRecord(result.error));
            setErrors(zodErrorsToRecord(result.error));
            return;
        }
        else setErrors({});


        try {
            console.log("Updating employee with:", result.data);
            setLoading(true);

            const response = await fetch(`/api/employee/${employeeId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result.data),
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (!response.ok) {
                console.error("Update employee failed:", data, response);
                return;
            }

            setStep(step + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    async function submitOnboarding() {
        if (!employeeId) {
            console.error("No employee loaded.");
            return;
        }

        const payload = {
            idNumber,
            currentStep: step + 1,
            completed: true,
            firstName,
            lastName,
            email,
            roleId,
            bio,
            goals,
            skills,
        };

        const result = employeeOnboardingSchema.safeParse(payload);

        if (!result.success) {
            setErrors(zodErrorsToRecord(result.error));
            return;
        }

        setErrors({});

        try {
            setLoading(true);

            const response = await fetch(`/api/employee/${employeeId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result.data),
            });

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (!response.ok) {
                console.error("Submit employee failed:", data, response);
                return;
            }

            setLastSubmittedAt(data.lastSubmittedAt ?? null);
            setStep(step + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function renderStep() {
        if (step === 0) {
            return (
                <EmployeeLookupStep
                    idNumber={idNumber}
                    setIdNumber={setIdNumber}
                    loading={loading}
                    onCreateNew={createNewEmployee}
                    onLoadExisting={loadExistingEmployee}
                />
            );
        }

        if (step === 1) {
            return (
                <EmployeeInfoStep
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    roleId={roleId}
                    setRoleId={setRoleId}
                    roles={roles}
                />
            );
        }

        if (step === 2) {
            return (
                <BioStep
                    bio={bio}
                    setBio={setBio}
                />
            );
        }

        if (step === 3) {
            return (
                <GoalsStep
                    goals={goals}
                    setGoals={setGoals}
                />
            );
        }

        if (step === 4) {
            return (
                <SkillsStep
                    skills={skills}
                    setSkills={setSkills}
                    allSkills={allSkills}
                />
            );
        }


        if (step === 5) {
            return (
                <ReviewStep
                    idNumber={idNumber}
                    lastSubmittedAt={lastSubmittedAt}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    roleId={roleId}
                    bio={bio}
                    goals={goals}
                    skills={skills}
                    roles={roles}
                    allSkills={allSkills}
                />
            );
        }

        return (
            <FinishedStep />
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100">
            <Card className="w-full max-w-2xl border border-slate-200/80 shadow-xl shadow-slate-300/30 bg-white/95 backdrop-blur">

                <CardHeader className="space-y-4 border-b border-slate-100">
                </CardHeader>
                <CardContent className="space-y-8 p-6">


                    <div>
                        <p className="text-3xl font-bold tracking-tight text-slate-900">
                            Employee Onboarding
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                            Complete each section to build the employee profile.
                        </p>
                    </div>

                    <Progress value={progress} className="h-1" />

                    <OnboardingBreadcrumb employeeId={employeeId} step={step} setStep={setStep} setErrors={setErrors} />

                    {renderStep()}

                    {errors && Object.keys(errors).length > 0 && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                            <h3 className="text-sm font-medium text-red-800">Errors</h3>
                            <ul className="list-disc list-inside text-red-500">
                                {Object.values(errors).flat().map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <OnboardingNav
                        step={step}
                        loading={loading}
                        onBack={() => { setStep(step - 1); setErrors({}); }}
                        onContinue={continueStep}
                        onSubmit={submitOnboarding}
                    />
                </CardContent>
            </Card>
        </div>
    );
}