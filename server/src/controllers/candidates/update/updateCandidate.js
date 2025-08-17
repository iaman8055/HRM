import Candidate from "../../../model/candidates/candidate.js"
import Employee from "../../../model/employees/employee.js";

const updateCandidate=async(req,res)=>{

    try {
        const candidate=await Candidate.findById(req.params.id);
    if(!candidate){
       return res.status(404).json({message:"Candidate not found"});
    }

    const prevStatus=candidate.status;
    const updatedData=req.body;

    const updatedCandidate=await Candidate.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {new:true}
    )
    if(updatedData.status==="selected" && prevStatus!=="selected"){
        console.log("condition true")

        const employee=new Employee({
        fullName: updatedCandidate.fullName,
        email: updatedCandidate.email,
        phoneNumber: updatedCandidate.phoneNumber,
        department: updatedCandidate.position,
        status: "present",
        task: "--",
        })
        await employee.save()
        console.log("employee data:",employee)

    }
    res.status(200).json({
      message: "Candidate data successfully updated",
      candidate: updatedCandidate,
    });
    } catch (error) {
        res.status(400).json({
      message: "Failed to update the candidate data",
      error: error.message,
    });
    }
    
}

export default updateCandidate;