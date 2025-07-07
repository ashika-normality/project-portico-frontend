const LabeledTextbox = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  rows = 4,
}) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label htmlFor={name} className="text-sm font-source-sans font-semibold">
      {label}{required ? <span className="text-red-700">*</span> : ""}
    </label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      rows={rows}
      className="border border-greyforoutline font-source-sans rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
    />
  </div>
);

export default LabeledTextbox; 