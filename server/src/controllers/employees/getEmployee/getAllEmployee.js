import Employee from "../../../model/employees/employee.js"

const getAllEmployees=async(req,res)=>{
    try {
        const emloyees=await Employee.find();
        return res.status(200).json({emloyees})
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch employees", error });

    }
}

export default getAllEmployees;