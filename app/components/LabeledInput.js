'use client'
import { useEffect } from "react";

const LabeledInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  register,
  setValue, // expects a function
  defaultValue, // expects the value to set
  style,
  disabled,
  onChange,
  required = false,
  preText,
  postText
}) => {
  useEffect(() => {
    if (setValue && defaultValue !== undefined) {
      setValue(name, defaultValue);
    }
  }, [setValue, defaultValue, name]);

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label htmlFor={name} className="text-sm font-source-sans font-semibold">
        {label}{required ? <span className="text-redimportant">*</span> : ""}
      </label>
      <div className="w-full flex items-center space-x-2">
        {preText && <span className="text-greyfortext">{preText}</span>}
        <input
          required={required}
          type={type}
          name={name}
          id={name}
          style={style}
          disabled={disabled}
          {...(register ? register(name) : {})}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-greyforoutline bg-white font-source-sans rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      {postText && <span className="text-greyfortext">{postText}</span>}
      </div>
    </div>
  );
};

export default LabeledInput;