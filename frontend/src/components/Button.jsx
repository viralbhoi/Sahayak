function Button({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
