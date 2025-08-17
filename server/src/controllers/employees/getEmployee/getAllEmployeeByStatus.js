import Employee from "../../../model/employees/employee.js"

export const getAllEmployeeByStatus=async(req,res)=>{
    try {
        const employeeData=await Employee.find({status:"present"});
        res.status(200).json({employeeData});
    } catch (error) {
        res.status(500).json({message:"failed to fetch present employee data"});
    }
}

export const getPresentEmployeeByName = async (req, res) => {
  try {
    const { name } = req.query; 

    if (!name) {
      return res.status(400).json({ message: "Name query is required" });
    }

    const employees = await Employee.find({
      status: "present",
      fullName: { $regex: name, $options: "i" }
    });

    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees by name", error: error.message });
  }
};

