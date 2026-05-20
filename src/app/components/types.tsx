import React from 'react';

export type Role = {
  id: string;
  value: string;
};

export type Skill = {
  id: string;
  value: string;
};

export type EmployeeFormState = {
  employeeId: string | null;
  idNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  bio: string;
  goals: string[];
  skills: string[];
};