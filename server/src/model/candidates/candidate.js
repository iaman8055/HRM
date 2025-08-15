import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, default: "new" },
  experience: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Candidate=mongoose.model("Candidates", candidateSchema)

export default Candidate;