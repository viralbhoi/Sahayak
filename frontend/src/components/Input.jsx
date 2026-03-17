function Input({
    placeholder,
    value,
    onChange,
    type = "text",
    icon: Icon,
    className = "",
}) {
    return (
        <div className="relative w-full">
            {/* Render icon if provided */}
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-stone-400" />
                </div>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`
                    w-full py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 
                    placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all
                    ${Icon ? "pl-12 pr-4" : "px-4"} 
                    ${className}
                `}
            />
        </div>
    );
}

export default Input;
