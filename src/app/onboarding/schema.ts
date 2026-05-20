import { z } from "zod";

export const employeeOnboardingSchema = z.object({
  idNumber: z
    .string()
    .trim()
    .min(1, "Employee ID Number is required."),

  currentStep: z.number().int().min(0).max(7),

  completed: z.boolean().default(true), 

  lastSubmittedAt: z.date().optional(),

  firstName: z
    .string()
    .trim()
    .min(1, "First name is required."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),

  roleId: z
    .string()
    .trim()
    .min(1, "Please select a role."),

  bio: z
    .string()
    .trim()
    .min(1, "Bio is required."),

  goals: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one goal."),

  skills: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one skill."),
});


export const employeeDraftSchema = z.object({
  idNumber: z
    .string()
    .trim()
    .min(1, "Employee ID Number is required."),

  currentStep: z.number().int().min(0).max(7),

  completed: z.boolean().optional(),

  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  email: z.string().trim().optional(),

  roleId: z.string().trim().optional(),

  bio: z.string().trim().optional(),

  goals: z.array(z.string().trim()).default([]),

  skills: z.array(z.string().trim()).default([]),
});

export type EmployeeOnboardingInput = z.infer<typeof employeeOnboardingSchema>;
export type EmployeeDraftInput = z.infer<typeof employeeDraftSchema>;