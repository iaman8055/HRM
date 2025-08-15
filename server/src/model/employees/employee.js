import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, default: "--" },
  status: { type: String, default: "present" },
  task: { type: String, default: "--" },
  createdAt: { type: Date, default: Date.now },
});

const Employee=mongoose.model("Employee", employeeSchema);
export default Employee;