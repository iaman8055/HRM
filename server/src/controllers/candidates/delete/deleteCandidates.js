import Candidate from "../../../model/candidates/candidate.js";

const deleteCandidate=async(req,res)=>{

      try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Candidate data deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "failed to update the candidate data" });
  }
}

export default deleteCandidate;