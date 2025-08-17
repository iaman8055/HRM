import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, default: "Intern" },
  department: { type: String,required:true },
  status: { type: String, default: "present" },
  task: { type: String, default: "--" },
  dateofjoining:{type:Date,default:Date.now},
  createdAt: { type: Date, default: Date.now },
});

const Employee=mongoose.model("Employee", employeeSchema);
export default Employee;