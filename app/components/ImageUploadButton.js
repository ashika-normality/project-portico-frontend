const ImageUploadButton = ({title, name, label, required, icon, description, tooltip, onClick, accept, }) => (
        <div className="flex flex-col space-y-1.5 w-full">
        <label className="text-sm font-source-sans font-semibold flex items-center space-x-1" htmlFor={name}>
        <span>{label}{required && label!="" ? <span className="text-red-700">*</span> : ""}</span>
        {tooltip && (
            <span className="relative group cursor-pointer">
            <span className="ml-1 w-4 h-4 inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xs font-bold">i</span>
            <span className="absolute left-1/2 z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap -translate-x-1/2 mt-2">
                {tooltip}
            </span>
            </span>
        )}
        </label>
        <div className="flex items-center justify-center w-full border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <button
                type="button"
                name={name}
                onClick={onClick}
                required={required}
                accept={accept}
                className="flex flex-col items-center justify-center w-full p-4 gap-2"
            >
                {icon && <div className="flex items-center justify-center">{icon}</div>}
                <div className="flex flex-col items-center justify-center">
                    <span className="font-source-sans text-sm text-gray-700">
                        <span className="font-semibold text-primary">{title}</span>
                    </span>
                    {description && (
                        <span className="text-xs text-gray-500">{description}</span>
                    )}
                </div>
            </button>
        </div>
        </div>
    );

export default ImageUploadButton;