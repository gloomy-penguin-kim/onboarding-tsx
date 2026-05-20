import React, { useEffect, useState } from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const DynamicInputs = ({ inputs, setInputs, desc }: { inputs: string[]; setInputs: React.Dispatch<React.SetStateAction<string[]>>; desc: string }) => {
  // Initialize with one item to meet the "minimum of one" requirement 
  
  useEffect(() => {
    if (inputs.length === 0) {
      setInputs(['']);
    } 
  }, [inputs, setInputs]);
  
  const handleChange = (index: any, value: any) => {
    const newInputs = [...inputs];  
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addInput = () => setInputs([...inputs, '']);

  const removeInput = (index: any) => {  
      setInputs(inputs.filter((_, i) => i !== index)); 
  };

  return (
    <div>
      {inputs.map((val, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <Input 
            value={val} 
            onChange={(e) => handleChange(i, e.target.value)} 
          /> 
            <Button variant="outline" onClick={() => removeInput(i)}>Remove</Button> 
        </div>
      ))}
      <Button variant="outline" onClick={addInput}>Add {desc}</Button>
    </div>
  );
}; 