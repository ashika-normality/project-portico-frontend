'use client'
import { useEffect } from "react";

const LabeledMultiInput = ({
  label,
  name1,
  name2,
  pretext1, pretext2,
  posttext1, posttext2,
  middleText,
  type1 = "text",
  type2 = "text",
  placeholder1,
  placeholder2,
  value1,
  value2,
  register,
  setValue,
  defaultValue1,
  defaultValue2,
  style1,
  style2,
  disabled = false,
  onChange1,
  onChange2,
  required = false
}) => {
  useEffect(() => {
    if (setValue) {
      if (defaultValue1 !== undefined) {
        setValue(name1, defaultValue1);
      }
      if (defaultValue2 !== undefined) {
        setValue(name2, defaultValue2);
      }
    }
  }, [setValue, defaultValue1, defaultValue2, name1, name2]);

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <label className="text-sm font-source-sans font-semibold">
          {label} {required && <span className="text-redimportant">*</span>}
        </label>
      )}
      <div className="flex items-center space-x-2 w-full">
        {pretext1 && <span className="text-greyfortext whitespace-nowrap">{pretext1}</span>}
        <input
          required={required}
          type={type1}
          name={name1}
          id={name1}
          style={style1}
          disabled={disabled}
          {...(register ? register(name1) : {})}
          placeholder={placeholder1}
          
          className="w-full border border-greyforoutline font-source-sans rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {posttext1 && <span className="text-greyfortext whitespace-nowrap">{posttext1}</span>}
        {middleText && <span className="text-greyfortext whitespace-nowrap">{middleText}</span>}
        {pretext2 && <span className="text-greyfortext whitespace-nowrap">{pretext2}</span>}
        <input
          required={required}
          type={type2}
          name={name2}
          id={name2}
          style={style2}
          disabled={disabled}
          {...(register ? register(name2) : {})}
          placeholder={placeholder2}
          
          className="w-full border border-greyforoutline font-source-sans rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {posttext2 && <span className="text-greyfortext whitespace-nowrap">{posttext2}</span>}
      </div>
    </div>
  );
};

export default LabeledMultiInput;
