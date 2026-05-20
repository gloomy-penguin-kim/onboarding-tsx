import { Button } from "@/components/ui/button";

type OnboardingNavProps = {
  step: number;
  loading: boolean;
  onBack: () => void;
  onContinue: () => void;
  onSubmit: () => void;
};

export function OnboardingNav({
  step,
  loading,
  onBack,
  onContinue,
  onSubmit,
}: OnboardingNavProps) {
  return (
    <div className="flex justify-between pt-6">
      <Button
        variant="outline"
        disabled={step === 0 || loading}
        onClick={onBack}
      >
        Back
      </Button>

      {step > 0 && step < 5 && (
        <Button
          onClick={onContinue}
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      )}

      {step === 5 && (
        <Button
          onClick={onSubmit}
          disabled={loading}
        >
          Submit
        </Button>
      )}
    </div>
  );
}