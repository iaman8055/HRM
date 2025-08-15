import Candidate from "../../../model/candidates/candidate.js"

const getAllcandidates=async(req,res)=>{
    try {
    const candidates=await Candidate.find();
    return res.status(200).json({
        candidates
    })
    } catch (error) {
        return res.statsu(500).json({message:"error finding candidates"})
    }
    
}

export default getAllcandidates;


