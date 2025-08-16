import Leave from "../../model/leave/leave.js";
import Employee from "../../model/employees/employee.js";
import { uploadToSupabase } from "../../util/uploadToSupabase.js"; // import your util

const addLeave = async (req, res) => {
  try {
    const { employeeId, name,designation, date, reason } = req.body;
    const file = req.file;

    // Validate required fields
    if (!employeeId || !name ||!designation || !date || !reason || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Generate unique filename
    const uniqueFileName = `${Date.now()}_${file.originalname}`;

    // Upload file using your util
    const publicUrl = await uploadToSupabase(
      "documents",
      uniqueFileName,
      file.buffer,
      file.mimetype
    );

    // Create leave entry
    const leave = new Leave({
      employeeId,
      name,
      designation,
      date,
      reason,
      docs: publicUrl,
    });

    await leave.save();

    res.status(201).json({
      message: "Leave request submitted successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting leave request",
      error: error.message,
    });
  }
};

export default addLeave;
