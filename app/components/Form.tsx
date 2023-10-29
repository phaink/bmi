"use client";


export default function Form({height, weight, handleHeightChange, handleWeightChange, handleFormSubmit}) {
    return (<form
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
      </form>)
}