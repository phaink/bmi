"use client";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import { convertToSIUnits } from "./utilities/Utility";
import type { tState, tChange, tUnit } from "./types/Types";
import Display from "./components/Display";


// Component stars here
export default function Home() {

  const [height, setHeight] = useState<tState>({
    value: `5'10"`,
    unit: "ft-in",
  });
  const [weight, setWeight] = useState<tState>({
    value: "154.5",
    unit: "lbs",
  });

  const [bmi, setBmi] = useState(0);

  const calcBmi = (h: number, w: number): number => w / (h * h);

  const handleWeightChange = (e: tChange) => {
    const qty_name = e.currentTarget.name;
    const qty_val = e.currentTarget.value as tUnit;

    if (qty_name === "weight-unit") {
      setWeight((prevState) => ({ ...prevState, unit: qty_val }));
      console.log(weight);
    }

    if (qty_name === "weight") {
      setWeight((prevState) => ({ ...prevState, value: qty_val }));
      console.log(weight);
    }
  };

  const handleHeightChange = (e: tChange) => {
    const qty_name = e.target.name;
    const qty_val = e.target.value;

    if (qty_name === "height-unit") {
      setHeight((prevState) => ({ ...prevState, unit: qty_val }));
    }

    if (qty_name === "height") {
      setHeight((prevState) => ({ ...prevState, value: qty_val }));
    }
  };

  
  const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submit event");
    const { heightInMeters, weightInKg } = convertToSIUnits(height, weight)
    setBmi(calcBmi(heightInMeters, weightInKg));
  };

  const { heightInMeters, weightInKg } = convertToSIUnits(height, weight);
  useEffect(() => {
    console.log("use effect called ");

    setBmi(calcBmi(heightInMeters, weightInKg));
  }, []);

 
  /* JSX */
  return (
    <main className="w-3/4 mx-auto border-solid border-2 border-sky-500">

      <Form 
          height={height} 
          weight={weight} 
          handleHeightChange={handleHeightChange} 
          handleWeightChange={handleWeightChange} 
          handleFormSubmit={handleFormSubmit} 
      />

      <Display  
          height={height} 
          weight={weight}
          bmi={bmi} 
      />

     

   
    </main>
  );
}
