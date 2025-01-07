import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/chat";

export const chatWithModel = async (payload) => {
    try {
        const response = await axios.post(API_URL, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error;
    }
};
