import Leave from "../../../model/leaves/leave.js";

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      // .populate("employeeId", "fullName email position department");

    res.status(200).json({
      message: "Leaves fetched successfully",
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching leaves",
      error: error.message,
    });
  }
};

export default getAllLeaves;
