interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            i < currentStep ? "bg-primary" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}