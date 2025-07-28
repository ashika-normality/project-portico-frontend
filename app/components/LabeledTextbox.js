'use client';
import { useEffect } from "react";

const LabeledTextbox = ({
  label,
  name,
  value,
  onChange,
  register,
  setValue, // Added prop
  defaultValue, // Added prop
  required = false,
  placeholder = "",
  rows = 4,
}) => {
  // useEffect hook to programmatically set the value using react-hook-form's setValue
  useEffect(() => {
    // Check if setValue function is provided and defaultValue has a value (is not undefined)
    if (setValue && defaultValue !== undefined) {
      setValue(name, defaultValue);
    }
  }, [setValue, defaultValue, name]); // Rerun effect if these dependencies change

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label htmlFor={name} className="text-sm font-source-sans font-semibold">
        {label}{required ? <span className="text-redimportant">*</span> : ""}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        // Register the textarea with react-hook-form if register function is provided
        {...(register ? register(name) : {})}
        placeholder={placeholder}
        rows={rows}
        className="border border-greyforoutline font-source-sans rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
      />
    </div>
  );
};

export default LabeledTextbox;
