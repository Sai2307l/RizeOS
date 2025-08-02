import axios from "axios";

const HF_API_URL =
  "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/sentence-similarity";

export async function extractSkills(data) {
  try {
    const response = await axios.post(HF_API_URL, data, {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const output = response.data;
    return output.skills || output;
  } catch (error) {
    console.error("Hugging Face API Error:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Body:", error.response?.data);

    throw new Error("Failed to extract skills");
  }
}
