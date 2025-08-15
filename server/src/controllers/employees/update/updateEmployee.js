import Employee from "../../../model/employees/employee.js"

const updateEmployee=async(req,res)=>{
    const employee=await Employee.findById(req.params.id);
    if(!employee){
        return res.status(404).json({message:"Employee not found"});
    }
    try {
         const updatedData=req.body;
    const updatedEmployee=await Employee.findByIdAndUpdate(req.params.id,
        updatedData,
        {new:true}
    )
    return res.status(200).json({message:"Employee Data updated successfully",updateEmployee});
    } catch (error) {
    res.status(400).json({ message: "Failed to update employee", error });
    }
   
}

export default updateEmployee;
