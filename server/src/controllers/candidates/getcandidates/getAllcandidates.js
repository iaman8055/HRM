import Candidate from "../../../model/candidates/candidate.js"

const getAllcandidates=async(req,res)=>{
    try {
    const candidates=await Candidate.find();
     res.status(200).json({
        candidates
    })
    } catch (error) {
     res.statsu(500).json({message:"error finding candidates"})
    }
    
}

export default getAllcandidates;


