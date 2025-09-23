'use client'
import { useEffect } from "react";

const LabeledInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  register,
  setValue,
  defaultValue,
  style,
  disabled,
  onChange,
  wholeBg,
  required = false,
  preText,
  postText,
  rules = {},
  error, // <-- added
}) => {
  useEffect(() => {
    if (setValue && defaultValue !== undefined) {
      setValue(name, defaultValue);
    }
  }, [setValue, defaultValue, name]);

  return (
    <div className={`flex flex-col ${wholeBg} space-y-1.5 w-full`}>
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
          {...(register ? register(name, rules) : {})}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border border-greyforoutline font-source-sans rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${error ? 'border-red-500' : ''}
          `}
        />
        {postText && <span className="text-greyfortext">{postText}</span>}
      </div>

      {/* Inline error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default LabeledInput;
