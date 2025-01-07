import React, { useState } from "react";
import { chatWithModel } from "../services/chatService";

const ChatComponent = () => {
    const [userInput, setUserInput] = useState("");
    const [response, setResponse] = useState("");

    const handleSendMessage = async () => {
        const payload = {
            messages: [
                { role: "system", content: "Provide a short, well-structured description based on the following input. Organize it into clear bullet points with a few words for each point." },
                { role: "user", content: userInput },
            ],
            model: "gpt-4o-mini",
            temperature: 1,
            max_tokens: 300,
            top_p: 1,
        };

        try {
            const apiResponse = await chatWithModel(payload);

            // Extract the message content
            const messageContent =
                apiResponse.choices && apiResponse.choices[0]?.message?.content;
            setResponse(messageContent || "No response received");
        } catch (error) {
            setResponse("Error communicating with the server.");
        }
    };

    return (
        <div>
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your message..."
                className="mt-40"
            />
            <button onClick={handleSendMessage}>Send</button>
            <div>
                <h3>Response:</h3>
                <pre>{response}</pre>
            </div>
        </div>
    );
};

export default ChatComponent;
