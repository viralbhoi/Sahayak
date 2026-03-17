function Card({ children, className = "" }) {
    return (
        <div
            className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-200 ${className}`}
        >
            {children}
        </div>
    );
}

export default Card;
