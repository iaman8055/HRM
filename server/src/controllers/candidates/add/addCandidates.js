import Candidate from '../../../model/candidates/candidate.js';
import supabase from '../../../config/supabase.js';
import { uploadToSupabase } from '../../../util/supabaseUpload.js';

const addCandidate = async (req, res) => {
  const { fullName, email, phoneNumber, position, experience } = req.body;

  if (!fullName || !email || !phoneNumber || !position || !experience) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  try {
       const fileName = `${fullName.replace(/\s/g, '_')}_${Date.now()}_${req.file.originalname}`;

    // Upload resume to Supabase (reusable function)
    const publicUrl = await uploadToSupabase(
      "resumesfile", // bucket name
      fileName,
      req.file.buffer,
      req.file.mimetype
    );

    // Save candidate to MongoDB
    const candidate = new Candidate({
      fullName,
      email,
      phoneNumber,
      position,
      experience,
      resumeUrl:publicUrl,
    });

    await candidate.save();

    res.status(201).json({ message: "Candidate added successfully", candidate });
  } catch (err) {
    res.status(500).json({ message: "Error saving candidate", error: err.message });
  }
};

export default addCandidate;
