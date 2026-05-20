import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Skill } from "./types";

type SkillsStepProps = {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  allSkills: Skill[];
};

export function SkillsStep({
  skills,
  setSkills,
  allSkills,
}: SkillsStepProps) {
  const [selectedSkillId, setSelectedSkillId] = useState("");

  const chosenSkills = useMemo(() => {
    return skills
      .map((id) => allSkills.find((skill) => skill.id === id))
      .filter((skill): skill is Skill => Boolean(skill));
  }, [skills, allSkills]);

  function addSelectedSkill() {
    if (!selectedSkillId) return;

    setSkills((currentSkills) => {
      if (currentSkills.includes(selectedSkillId)) {
        return currentSkills;
      }

      return [...currentSkills, selectedSkillId];
    });

    setSelectedSkillId("");
  }

  function removeSkill(skillId: string) {
    setSkills((currentSkills) =>
      currentSkills.filter((id) => id !== skillId)
    );
  }

  return (
  <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Skills
      </h2>

      <div className="flex gap-2">
        <Select
          value={selectedSkillId}
          onValueChange={setSelectedSkillId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Skill" />
          </SelectTrigger>

          <SelectContent>
            {allSkills.map((skill) => (
              <SelectItem key={skill.id} value={skill.id}>
                {skill.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={addSelectedSkill}
          disabled={!selectedSkillId}
        >
          Add Skill
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {chosenSkills.map((skill) => (
          <Button
            key={skill.id}
            variant="outline"
            onClick={() => removeSkill(skill.id)}
          >
            {skill.value} ×
          </Button>
        ))}
      </div>
    </div>
  );
}