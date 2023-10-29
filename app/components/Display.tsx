import { LOWER_LIMIT, UPPER_LIMIT } from "../constants/Contants";
import type { tState } from "../types/Types";
import { convertToSIUnits } from "../utilities/Utility";

interface iProps {
  height: tState
  weight: tState 
  bmi: number
}

export default function Display({height, weight, bmi}: iProps) {
  const { heightInMeters, weightInKg } = convertToSIUnits(height, weight);

    const bmiStyles =
    bmi > LOWER_LIMIT && bmi < UPPER_LIMIT
      ? "text-1xl font-bold text-emerald-600"
      : "text-1xl font-bold text-red-500";

    return (
      <div className="display flex flex-wrap gap-2">     
        <div id="input-units" className="flex-1 bg-slate-300 my-3 p-3">
        <p className="text-1xl font-bold text-gray-700">
          <span>Height: </span>
          <span> {height.value} </span>
          <span> {height.unit} </span>
        </p>
        <p className="text-1xl font-bold text-gray-700">
          <span>Weight: </span>
          <span> {weight.value} </span>
          <span> {weight.unit} </span>
        </p>

      </div>
      <div id="si-units" className="bg-slate-300 my-3 p-3">
        <p className="text-1xl font-bold text-gray-700">
          <span>Height: </span>
          <span> {heightInMeters.toFixed(4)} </span>
          <span> m </span>
        </p>
        <p className="text-1xl font-bold text-gray-700">
          <span>Weight: </span>
          <span> {weightInKg.toFixed(1)} </span>
          <span> kg </span>
        </p>
        <p className={bmiStyles}>
          <span>BMI: </span>
          <span> {bmi.toFixed(2)} </span>
          <span className=""> kg / m<sup>2</sup> </span>
        </p>
      </div>
      
    </div>    
    )
}