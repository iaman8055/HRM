import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true, 
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"], 
    default: "pending",
  },
  docs: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
