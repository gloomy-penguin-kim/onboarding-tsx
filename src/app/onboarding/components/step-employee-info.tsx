import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 

import type { Role } from "./types";

type EmployeeInfoStepProps = {
  firstName: string;
  setFirstName: (value: string) => void;

  lastName: string;
  setLastName: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  roleId: string;
  setRoleId: (value: string) => void;

  roles: Role[];
};

export function EmployeeInfoStep({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  roleId,
  setRoleId,
  roles,
}: EmployeeInfoStepProps) {
  return (
    <> 
  <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Employee Information
      </h2>
<Input
  className="bg-white border-slate-200 focus-visible:ring-blue-500"
        placeholder="First Name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
<Input
  className="bg-white border-slate-200 focus-visible:ring-blue-500"
        placeholder="Last Name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
<Input
  className="bg-white border-slate-200 focus-visible:ring-blue-500"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <Select value={roleId} onValueChange={setRoleId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>

        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.id}>
              {role.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    </>
  );
}