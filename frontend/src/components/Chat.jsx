import { useEffect, useState, useRef } from "react";
import api from "../api/api";

function Chat({ jobId }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);

    const role = localStorage.getItem("role");

    const fetchMessages = async () => {
        const res = await api.get(`/messages/${jobId}`);
        setMessages(res.data.data);
    };

    useEffect(() => {
        fetchMessages();

        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = async () => {
        if (!input) return;

        console.log("Sending message:", input);
        console.log("Role:", localStorage.getItem("role"));
        console.log("Job ID:", jobId);
        console.log("Sender ID", localStorage.getItem("userId"));

        await api.post(`/messages/${jobId}`, {
            message: input,
        });

        setInput("");
        fetchMessages();
    };

    return (
        <div className="p-4 border rounded-xl flex flex-col h-100">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-3">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                            m.sender_role === role
                                ? "bg-blue-500 text-white self-end"
                                : "bg-gray-200 self-start"
                        }`}
                    >
                        {m.message}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") send();
                    }}
                    className="flex-1 border rounded px-2 py-1"
                />
                <button
                    onClick={send}
                    className="bg-primary text-white px-4 py-1 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
