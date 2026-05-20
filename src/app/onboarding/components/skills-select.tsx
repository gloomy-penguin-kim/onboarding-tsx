import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Skill = {
    id: string;
    value: string;
};

type SkillsSelectProps = {
    skills: string[];
    setSkills: React.Dispatch<React.SetStateAction<string[]>>;
    allSkills: Skill[];
};

export const SkillSelect = ({
    skills,
    setSkills,
    allSkills,
}: SkillsSelectProps) => {
    const [selectedSkillId, setSelectedSkillId] = useState("");

    function addSelectedSkill() {
        if (!selectedSkillId) return;

        if (!skills.includes(selectedSkillId)) {
            setSkills((currentSkills) => [
            ...currentSkills,
            selectedSkillId,
            ]);
        } 
    }

    function removeSkill(skillId: string) {
        setSkills((currentSkills) =>
            currentSkills.filter((id) => id !== skillId)
        );
    }

    const chosenSkills = skills
        .map((id) => allSkills.find((skill) => skill.id === id))
        .filter((skill): skill is Skill => Boolean(skill));

    return (
        <>
            <div className="flex gap-2 mb-2">
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
        </>
    );
};