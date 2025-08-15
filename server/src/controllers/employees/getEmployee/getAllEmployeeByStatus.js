import Employee from "../../../model/employees/employee.js"

const getAllEmployeeByStatus=async(req,res)=>{
    try {
        const employeeData=await Employee.find({status:"present"});
        res.status(200).json({employeeData});
    } catch (error) {
        res.status(500).json({message:"failed to fetch present employee data"});
    }
}

export default getAllEmployeeByStatus;