const LabeledSelect = ({
  label,
  name,
  options = [],
  value,
  setValue,
  register,
  onChange,
  required = false,
  placeholder = "Select an option",
}) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label htmlFor={name} className="text-sm font-source-sans font-semibold">
      {label}{required ? <span className="text-red-700">*</span> : ""}
    </label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="border border-greyforoutline font-source-sans rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default LabeledSelect; 