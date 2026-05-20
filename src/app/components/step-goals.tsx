import { DynamicInputs } from "./dyamic-inputs";

type GoalsStepProps = {
  goals: string[];
  setGoals: React.Dispatch<React.SetStateAction<string[]>>;
};

export function GoalsStep({ goals, setGoals }: GoalsStepProps) {

  return (
  <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Goals
      </h2>

      <DynamicInputs
        inputs={goals}
        setInputs={setGoals}
        desc="Goal"
      />
    </div>
  );
}