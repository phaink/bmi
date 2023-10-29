
import { INCH_TO_CM, KG_TO_LBS } from "../constants/Contants";
import type { tState } from "../types/Types";


interface iImperialUnitsObject {
  heightInFtIn: string
  weightInLbs: string
}

export function getFeetInchesFromString(height: string): (number | undefined) [] {
  const regex = /(\d+)\'(\d+)\"/; // Regular expression to match the format ft'in"
  const match = height.match(regex);
  let feet, inches;

  if (match) {
    feet = parseInt(match[1], 10); // Parse the feet part as an integer
    inches = parseInt(match[2], 10); // Parse the inches part as an integer
  }
  return [feet, inches];
}


// SI Units
export function convertFeetInchesToCm(feet: number, inches: number): number {
    const totalInches = feet * 12 + inches;
    const centimeters = totalInches * INCH_TO_CM;
    return centimeters;
}

export function convertToSIUnits(height:tState, weight:tState) {
  let heightInMeters, weightInKg;
  if (height.unit === "cm") {
    heightInMeters = parseFloat(height.value) / 100;
  } else if (height.unit === "ft-in") {
    const result = getFeetInchesFromString(height.value);
    heightInMeters = convertFeetInchesToCm(result[0] as number, result[1] as number) / 100;
  } else {
    heightInMeters = parseFloat(height.value);
  }

  if (weight.unit === "lbs") {
    weightInKg = parseFloat(weight.value) / KG_TO_LBS;
  } else {
    weightInKg = parseFloat(weight.value);
  }

  return { heightInMeters, weightInKg};
}


// To Imperial Units
export function covertToImperialUnits(height: tState, weight: tState): iImperialUnitsObject {
  let heightInFtIn: string, wR: number,  weightInLbs: string;

  if (height.unit === "cm") {
    const heightInCm = parseFloat(height.value);
    heightInFtIn = convertCMToFeetInches(heightInCm);
  } else if (height.unit === "m") {
    const heightInCm = parseFloat(height.value) * 100;
    heightInFtIn = convertCMToFeetInches(heightInCm);
  } else {
    heightInFtIn = height.value;
  }

  if (weight.unit === "kg") {
    wR = parseFloat(weight.value) * KG_TO_LBS;
  } else {
    wR = parseFloat(weight.value);
  }
  
  weightInLbs = wR.toFixed(2)
  return { heightInFtIn, weightInLbs };
}

export function convertCMToFeetInches(cm: number): string {
  const totalInches = cm / INCH_TO_CM;
  const inches = totalInches % 12;
  const feet = (totalInches - inches) / 12;
  return `${feet}'${inches.toFixed()}"`;
}


