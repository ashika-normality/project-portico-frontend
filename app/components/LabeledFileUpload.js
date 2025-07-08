'use client'
import { useRef, useState } from "react";
import { MdCloudUpload } from "react-icons/md";


const LabeledFileUpload = ({
  label,
  name,
  icon,
  onChange,
  required = false,
  tooltip = "",
  accept = "",
}) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-sm font-source-sans font-semibold flex items-center space-x-1" htmlFor={name}>
        <span>{label}{required ? <span className="text-red-700">*</span> : ""}</span>
        {tooltip && (
          <span className="relative group cursor-pointer">
            <span className="ml-1 w-4 h-4 inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs font-bold">i</span>
            <span className="absolute left-1/2 z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap -translate-x-1/2 mt-2">
              {tooltip}
            </span>
          </span>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        ref={inputRef}
        onChange={onChange}
        required={required}
        accept={accept}
        className="hidden"
      />
      <div
        className={`w-full flex flex-col items-center justify-center border-2 rounded-lg transition-colors cursor-pointer py-6 px-4 bg-white ${dragActive ? "border-primary bg-orange-50" : "border-greyforoutline"}`}
        onClick={handleButtonClick}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        tabIndex={0}
        role="button"
        aria-label="File upload dropzone"
      >
        {icon ? icon : ""}
        <span className="font-source-sans text-sm text-gray-700">
          <span className="font-semibold text-primary">{label}</span>{required ? <span className="text-red-700">*</span> : ""}
        </span>
        <span className="text-xs text-greyfortext mt-1">Click to Upload or Drag and Drop Files here</span>
      </div>
    </div>
  );
};

export default LabeledFileUpload; 