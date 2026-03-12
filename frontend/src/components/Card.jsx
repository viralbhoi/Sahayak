function Card({ children }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            {children}
        </div>
    );
}

export default Card;
