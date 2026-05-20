import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type OnboardingBreadcrumbProps = {
    step: number;
    setStep: (step: number) => void;
    employeeId: string | null;
    setErrors: (errors: Record<string, string>) => void;
};

export function OnboardingBreadcrumb({
    step,
    setStep,
    employeeId,
    setErrors, 
}: OnboardingBreadcrumbProps) {
    const canNavigatePastId = Boolean(employeeId);

    function handleNavigation(targetStep: number) {
        if (targetStep >= 0  && targetStep <= 6) {
            setStep(targetStep); 
            setErrors({});
            return;
        }
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {step >= 0 && (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                asChild
                            >
                                <button
                                    type="button"
                                    onClick={() => handleNavigation(0)}
                                    className={step === 0 ? "font-semibold" : ""}
                                >
                                    Home
                                </button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}


                {step >= 1 && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <button
                                    type="button"
                                    disabled={!canNavigatePastId}
                                    onClick={() => handleNavigation(1)}
                                    className={step === 1 ? "font-semibold" : ""}
                                >
                                    Info
                                </button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}


                {step >= 2 && (
                    <>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <button
                                    type="button"
                                    disabled={!canNavigatePastId}
                                    onClick={() => handleNavigation(2)}
                                    className={step === 2 ? "font-semibold" : ""}
                                >
                                    Bio
                                </button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}


                {step >= 3 && (
                    <>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <button
                                    type="button"
                                    disabled={!canNavigatePastId}
                                    onClick={() => handleNavigation(3)}
                                    className={step === 3 ? "font-semibold" : ""}
                                >
                                    Goals
                                </button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}

                {step >= 4 && (
                    <>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <button
                                    type="button"
                                    disabled={!canNavigatePastId}
                                    onClick={() => handleNavigation(4)}
                                    className={step === 4 ? "font-semibold" : ""}
                                >
                                    Skills
                                </button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}

                {step >= 5 && (
                    <>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <button
                                    type="button"
                                    disabled={!canNavigatePastId}
                                    onClick={() => handleNavigation(5)}
                                    className={step === 5 ? "font-semibold" : ""}
                                >
                                    Review
                                </button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}

                {step >= 6 && (
                    <>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <button
                                    type="button"
                                    disabled={!canNavigatePastId}
                                    onClick={() => handleNavigation(6)}
                                    className={step === 5 ? "font-semibold" : ""}
                                >
                                    Thank You
                                </button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}