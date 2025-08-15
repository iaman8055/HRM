import Candidate from '../../../model/candidates/candidate.js';
import supabase from '../../../config/supabase.js';

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

    // Upload to Supabase storage
    const { error } = await supabase.storage
      .from('resumesfile')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      return res.status(500).json({ message: "Error uploading resume", error: error.message });
    }

    // Get public URL
    const { data } = supabase.storage
      .from('resumesfile')
      .getPublicUrl(fileName);

    if (!data || !data.publicUrl) {
      return res.status(500).json({ message: "Failed to get public URL from Supabase" });
    }

    // Save candidate to MongoDB
    const candidate = new Candidate({
      fullName,
      email,
      phoneNumber,
      position,
      experience,
      resumeUrl: data.publicUrl,
    });

    await candidate.save();

    res.status(201).json({ message: "Candidate added successfully", candidate });
  } catch (err) {
    res.status(500).json({ message: "Error saving candidate", error: err.message });
  }
};

export default addCandidate;
