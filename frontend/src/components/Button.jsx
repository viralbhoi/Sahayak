function Button({
    children,
    onClick,
    className = "",
    disabled = false,
    type = "button",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2
                ${
                    disabled
                        ? "bg-amber-800/60 text-white/80 cursor-not-allowed"
                        : "bg-amber-800 text-white hover:bg-amber-900 hover:shadow-lg hover:-translate-y-0.5"
                }
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export default Button;
