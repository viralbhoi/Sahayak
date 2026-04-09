import { useState } from "react";

function RatingModal({ isOpen, onClose, onSubmit }) {
    const [rating, setRating] = useState(0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-80">
                <h3 className="text-lg font-semibold text-center mb-4">
                    Rate Worker
                </h3>

                <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-2xl cursor-pointer ${
                                star <= rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                            }`}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <div className="flex justify-between">
                    <button onClick={onClose} className="text-gray-500">
                        Cancel
                    </button>

                    <button
                        onClick={() => onSubmit(rating)}
                        className="bg-primary text-white px-4 py-1 rounded"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RatingModal;
