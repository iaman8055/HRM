import Leave from "../../../model/leaves/leave.js";
import { uploadToSupabase } from "../../../util/supabaseUpload.js";

const updateLeave = async (req, res) => {
  try {
    const { leaveId } = req.params; 
    const { date, reason, status } = req.body;

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (req.file) {
      const fileBuffer = req.file.buffer;
      const fileName = `leave-${Date.now()}-${req.file.originalname}`;
      const contentType = req.file.mimetype;

      // Upload to Supabase bucket
      const fileUrl = await uploadToSupabase("documents", fileName, fileBuffer, contentType);

      leave.docs = fileUrl;
    }

    // Update fields if provided
    if (date) leave.date = date;
    if (reason) leave.reason = reason;
    if (status) leave.status = status; 

    await leave.save();

    res.status(200).json({
      message: "Leave updated successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating leave",
      error: error.message,
    });
  }
};

export default updateLeave;
