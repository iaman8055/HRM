// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "./candidate/candidateSlice";
import employeeReducer from "./employee/employeeSlice"
import attendanceReducer from './attendance/attendanceSlice'
import leaveReducer from './leave/leaveSlice'
export const store = configureStore({
  reducer: {
    candidates: candidateReducer,
    employees: employeeReducer,
    attendance:attendanceReducer,
    leave: leaveReducer,

  },
});
