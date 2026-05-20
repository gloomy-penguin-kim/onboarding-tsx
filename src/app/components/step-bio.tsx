import { Textarea } from "@/components/ui/textarea";

type BioStepProps = {
    bio: string;
    setBio: (value: string) => void;
};

export function BioStep({ bio, setBio }: BioStepProps) {
    return (
        <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
                Bio
            </h2>
            <Textarea
                className="min-h-32 bg-white border-slate-200 focus-visible:ring-blue-500 resize-none"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
            />
        </div>
    );
}