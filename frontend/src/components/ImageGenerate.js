// import { useState, useEffect } from "react";

// const ImageGenerate = () => {
//   const [response, setResponse] = useState(null); // Holds the generated image blob
//   const [error, setError] = useState(null); // Holds any errors from the API call

//   const query = async (data) => {
//     try {
//       const response = await fetch(
//         "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large-turbo",
//         {
//           headers: {
//             Authorization: `Bearer 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`,
//             "Content-Type": "application/json",
//           },
//           method: "POST",
//           body: JSON.stringify(data),
//         }
//       );
//       if (!response.ok) throw new Error("API request failed");
//       return await response.blob();
//     } catch (err) {
//       setError(err.message);
//       console.error("Error:", err);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const imageBlob = await query({ inputs: "Astronaut riding a horse" });
//       if (imageBlob) setResponse(URL.createObjectURL(imageBlob)); // Create URL for the blob
//     };
//     fetchData();
//   }, []); // Runs once when the component mounts

//   return (
//     <div>
//       <h1>Image Generate</h1>
//       {error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : response ? (
//         <img src={response} alt="Generated" style={{ maxWidth: "100%" }} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default ImageGenerate;
