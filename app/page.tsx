"use client";
import { useState, useEffect } from "react";

type tState = {
  value: string;
  unit: "kg" | "lbs" | "ft-in" | "m" | "cm";
};
type tChange =
  | React.FormEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>;

function convertFeetInchesToCm(feet: number, inches: number) {
  const totalInches = feet * 12 + inches;
  const centimeters = totalInches * 2.54;
  return centimeters;
}

function getFeetInchesFromString(height: string): number[] {
  const regex = /(\d+)\'(\d+)\"/; // Regular expression to match the format ft'in"
  const match = height.match(regex);
  let feet, inches;

  if (match) {
    feet = parseInt(match[1], 10); // Parse the feet part as an integer
    inches = parseInt(match[2], 10); // Parse the inches part as an integer
  }
  return [feet, inches];
}

// Component stars here
export default function Home() {
  const lowerLimit = 18.5;
  const upperLimit = 24.5;
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
    const qty_name = e.target.name;
    const qty_val = e.target.value;

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

  function convertUnits() {
    let heightInMeters, weightInKg;
    if (height.unit === "cm") {
      heightInMeters = parseFloat(height.value) / 100;
    } else if (height.unit === "ft-in") {
      const result = getFeetInchesFromString(height.value);
      heightInMeters = convertFeetInchesToCm(result[0], result[1]) / 100;
    } else {
      heightInMeters = parseFloat(height.value);
    }

    if (weight.unit === "lbs") {
      weightInKg = parseFloat(weight.value) / 2.20462262;
    } else {
      weightInKg = parseFloat(weight.value);
    }

    return { heightInMeters, weightInKg };
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submit event");
    const { heightInMeters, weightInKg } = convertUnits();
    setBmi(calcBmi(heightInMeters, weightInKg));
  };

  const { heightInMeters, weightInKg } = convertUnits();
  useEffect(() => {
    console.log("use effect called ");

    setBmi(calcBmi(heightInMeters, weightInKg));
  }, []);

  const bmiStyles =
    bmi > lowerLimit && bmi < upperLimit
      ? "text-1xl font-bold text-emerald-500"
      : "text-1xl font-bold text-red-500";

  /* JSX */
  return (
    <main>
      <h1 className="text-center text-5xl font-extrabold text-emerald-500 m-5">
        Body Mass Index
      </h1>

      <form
        className="bg-slate-300 w-1/2 min-w-fit max-w-full p-3 flex flex-col gap-4"
        method="post"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="height">Height</label>
          <div className="flex flex-row gap-1">
            <input
              id="height"
              name="height"
              type="text"
              value={height.value}
              onChange={handleHeightChange}
              className="px-1"
            />
            <select
              name="height-unit"
              id="height-unit"
              value={height.unit}
              onChange={handleHeightChange}
            >
              <option value="ft-in">ft&lsquo;in&ldquo;</option>
              <option value="m">m</option>
              <option value="cm">cm</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="weight">Weight</label>
          <div className="flex flex-row gap-1">
            <input
              id="weight"
              name="weight"
              type="text"
              value={weight.value}
              onChange={handleWeightChange}
              className="px-1"
            />
            <select
              name="weight-unit"
              id="weight-unit"
              value={weight.unit}
              onChange={handleWeightChange}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>
        <button
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Calculate
        </button>
      </form>
      <div className="result bg-slate-300 my-3 p-3">
        <p className="text-1xl font-bold text-gray-700">
          <span>Weight: </span>
          <span> {weight.value} </span>
          <span> {weight.unit} </span>
        </p>
        <p className="text-1xl font-bold text-gray-700">
          <span>Height: </span>
          <span> {height.value} </span>
          <span> {height.unit} </span>
        </p>
        <p className={bmiStyles}>
          <span>BMI: </span>
          <span> {bmi.toFixed(2)} </span>
        </p>
      </div>

      <div id="si-units" className="bg-slate-300 my-3 p-3">
        <p className="text-1xl font-bold text-gray-700">
          <span>Height: </span>
          <span> {heightInMeters.toFixed(4)} </span>
          <span> m </span>
        </p>
        <p className="text-1xl font-bold text-gray-700">
          <span>Height: </span>
          <span> {weightInKg.toFixed(2)} </span>
          <span> kg </span>
        </p>
        <p className={bmiStyles}>
          <span>BMI: </span>
          <span> {bmi.toFixed(2)} </span>
        </p>
      </div>
    </main>
  );
}
