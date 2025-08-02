import pdfParse from "pdf-parse";
import { extractSkills } from "../services/huggingface.js";
import list_skills from "../const/skills.js";
export async function processResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file in req.file" });
    }
    const pdfData = await pdfParse(req.file.buffer);
    console.log("PDF Data:", pdfData.text);
    const queryText = {
      inputs: {
        source_sentence: pdfData.text,
        sentences: list_skills,
      },
    };
    const skills = await extractSkills(queryText);
    const present_skills = list_skills.filter((skill, index) => skills[index] > 0.2);
    res.json({ skills: present_skills });
  } catch (error) {
    console.error("AI Processing Error:", error.message);
    res.status(500).json({ error: "Failed to extract skills" });
  }
}
