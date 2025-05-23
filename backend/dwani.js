import axios from "axios";

// Replace with your actual Dwani API key
const DWANI_API_KEY = "YOUR_DWANI_API_KEY";

export const useDwaniAPI = async (message) => {
  try {
    const response = await axios.post(
      "https://api.dwani.ai/kannada-chat",
      { input: message },
      {
        headers: {
          Authorization: `Bearer ${DWANI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.reply;
  } catch (err) {
    console.error("Error from Dwani API", err);
    return "ಮನ್ನಿಸಿ, ನಾನು ಇತ್ತೀಚೆಗೆ ಉತ್ತರ ನೀಡಲು ಅಸಮರ್ಥನಾಗಿದ್ದೇನೆ.";
  }
};
