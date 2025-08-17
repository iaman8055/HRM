import Leave from "../../../model/leaves/leave"

const getApprovedLeaves=async(req,res)=>{
    try {
        const leaves=await Leave.find({status:"approved"})
          res.status(200).json({leaves});
    } catch (error) {
        res.status(500).json({message:"Error finding approved leaved"})
    }
}