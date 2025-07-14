const LabeledInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  register,
  onChange,
  required = false,
}) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label htmlFor={name} className="text-sm font-source-sans font-semibold">
      {label}{required ? <span className="text-red-700">*</span> : ""}
    </label>
    <input
      required={required}
      type={type}
      name={name}
      id={name}
      {...(register ? register(name) : {})}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-greyforoutline font-source-sans rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);

export default LabeledInput; 