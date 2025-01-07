import axios from "axios";

const generateImage = async (prompt, setImage) => {
  try {
    const response = await axios.post("http://localhost:8080/api/ai/generate", {
      prompt: prompt,
    });
    setImage(`data:image/png;base64,${response.data.image}`);
  } catch (error) {
    console.error("Error generating image:", error);
  }
};

export default generateImage;
