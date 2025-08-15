import Employee from "../../../model/employees/employee.js";

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee data deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "failed to update the Employee data" });
  }
};

export default deleteEmployee;
