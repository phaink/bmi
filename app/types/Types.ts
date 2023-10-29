
export type tUnit = "kg" | "lbs" | "ft-in" | "m" | "cm";
export type tState = {
    value: string;
    unit: tUnit;
  };
  
export type tChange =
    | React.FormEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLInputElement>;