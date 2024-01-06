// "use client";

import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import React, { useState } from "react";
import InputRange, { Range } from "react-input-range";
import "react-input-range/lib/css/index.css";
import { MdSettingsBackupRestore } from "react-icons/md";

const classNames = {
  activeTrack: "input-range__track input-range__track--active !bg-[#306c8a]",
  disabledInputRange: "input-range input-range--disabled",
  inputRange: "input-range",
  labelContainer: "input-range__label-container",
  maxLabel: "input-range__label input-range__label--max !font-sans ",
  minLabel: "input-range__label input-range__label--min !font-sans",
  slider: "input-range__slider !bg-[#265369] !border-[#306c8a]",
  sliderContainer: "input-range__slider-container",
  track: "input-range__track input-range__track--background",
  valueLabel: "input-range__label input-range__label--value !font-sans",
};

export const initialState = { min: 0, max: 5000 };

type PriceSliderProps = { handleConfirmPriceRange: (val: Range) => void };

const PriceSlider = ({ handleConfirmPriceRange }: PriceSliderProps) => {
  const [inputsValue, setInputsValue] = useState<Range>(initialState); // this inputs can be any value
  // here to be stored validated price range data. (LOCAL STORAGE)
  const [rangeValue, setRangeValue] = useLocalStorageState(
    initialState,
    "rangeValue"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (Number.isInteger(Number(value))) {
      setInputsValue(() => {
        const newInputsValue = { ...inputsValue, [name]: Number(value) };

        setRangeValue(() => {
          // filtering all dumb inputs
          const validStart = Math.min(
            Math.max(newInputsValue.min, initialState.min),
            rangeValue.max
          );
          const validEnd = Math.max(
            Math.min(newInputsValue.max, initialState.max),
            validStart
          );
          return {
            min: validStart,
            max: validEnd,
          };
        });
        return newInputsValue;
      });
    }
  };

  return (
    <div className="bg-white h-32 p-6 md:p-8 flex flex-col justify-between items-center rounded-md drop-shadow">
      <InputRange
        allowSameValues
        classNames={classNames}
        formatLabel={(val) => `$${val}`}
        step={20}
        maxValue={initialState.max}
        minValue={initialState.min}
        value={rangeValue}
        onChange={(value) => setRangeValue(value as Range)}
        onChangeComplete={(value) => {
          setInputsValue(value as Range);
        }}
      />
      <div className="flex justify-between mt-4 gap-2 md:gap-6 h-8">
        <div className="flex gap-1">
          <span className="sm:flex items-center hidden">From:</span>
          <input
            className="border w-16 md:w-fit border-gray-300 bg-white  rounded-lg text-sm  text-center"
            type="number"
            name="min"
            // defaultValue={inputsValue.min}
            value={inputsValue.min}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-1">
          <span className="hidden sm:flex items-center text-sm md:text-base">
            To:
          </span>
          <span className="sm:hidden font-semibold mr-1 translate-y-1">-</span>
          <input
            className="border w-16 md:w-fit border-gray-300 bg-white rounded-lg text-sm text-center"
            type="number"
            name="max"
            // defaultValue={inputsValue.max}
            value={inputsValue.max}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className=" bg-sky-800 text-sky-50 hover:bg-sky-700 transition-colors py-1 px-2 sm:px-3 rounded-md"
          onClick={() => handleConfirmPriceRange(rangeValue)}>
          Confirm
        </button>
        <button
          aria-label="Reset price filters"
          className="bg-slate-200 px-2 py-1 rounded-md hover:bg-slate-300 transition-colors"
          onClick={() => {
            setRangeValue(initialState);
            setInputsValue(initialState);
          }}>
          <MdSettingsBackupRestore className="h-6 w-6 text-slate-800 " />
        </button>
      </div>
    </div>
  );
};

export default PriceSlider;
