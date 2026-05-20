import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb" 

type EmployeeLookupStepProps = {
  idNumber: string;
  setIdNumber: (value: string) => void;
  loading: boolean;
  onCreateNew: () => void;
  onLoadExisting: () => void;
};

export function EmployeeLookupStep({
  idNumber,
  setIdNumber,
  loading,
  onCreateNew,
  onLoadExisting,
}: EmployeeLookupStepProps) {
  return (
    <>  
  <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Employee ID Number
      </h2>


      <Input
        placeholder="Employee ID"
        value={idNumber}
        onChange={(event) => setIdNumber(event.target.value)}
      />

      <div className="flex gap-2">
        <Button
          onClick={onCreateNew}
          disabled={loading || !idNumber.trim()}
        >
          New Employee
        </Button>

        <Button
          variant="outline"
          onClick={onLoadExisting}
          disabled={loading || !idNumber.trim()}
        >
          Load Employee
        </Button>
      </div>
    </div>
    </>
  );
}