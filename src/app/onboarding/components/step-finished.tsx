export function FinishedStep() {
    let thankYou = "Thank You for completing the onboarding process! Your profile is now complete and ready to be used. You can always come back and update your information or add new skills and goals as you grow in your career. Welcome aboard!"

    return (
  <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
      <h2 className="text-lg font-semibold text-slate-900">
                Thank You!
            </h2>

            <p>
                {thankYou}
            </p>
        </div>
    );
}