import { useState } from "react";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input) return;
        const userMsg = { role: "user", content: input };
        setMessages([...messages, userMsg]);
        setInput("");
        setLoading(true);

        const res = await fetch("http://localhost:3001/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });

        const reader = res.body.getReader();
        let assistantMsg = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = new TextDecoder().decode(value);
            assistantMsg += chunk.replace("data:", "").trim();

            setMessages((prev) => [
                ...prev.filter((m) => m.role !== "assistant"),
                { role: "assistant", content: assistantMsg },
            ]);
        }
        setLoading(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
                style={{
                    minHeight: "300px",
                    border: "1px solid #ccc",
                    padding: "1rem",
                    overflowY: "auto",
                }}
            >
                {messages.map((m, i) => (
                    <div key={i} style={{ marginBottom: "0.5rem" }}>
                        <b>{m.role}:</b> {m.content}
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                    style={{ flex: 1, padding: "0.5rem" }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask something about your PDF..."
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? "Typing..." : "Send"}
                </button>
            </div>
        </div>
    );
}
