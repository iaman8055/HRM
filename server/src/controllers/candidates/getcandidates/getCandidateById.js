import Candidate from "../../../model/candidates/candidate.js";

const getCandidateById = async (req, res) => {
  try {
   const candidate= await Candidate.findById(req.params.id);
    res.status(200).json({candidate});
  } catch (error) {
    res.status(400).json({ message: "No candidate was found with this id" });
  }
};

export default getCandidateById;
