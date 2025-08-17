// src/redux/slices/attendanceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// ✅ Fetch all employees for attendance
export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async () => {
    const res = await API.get("/employee");
    return res.data.employees || [];
  }
);

// ✅ Update employee status
export const updateEmployeeStatus = createAsyncThunk(
  "attendance/updateEmployeeStatus",
  async ({ id, status }) => {
    await API.put(`/employee/${id}`, { status });
    return { id, status };
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateEmployeeStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const emp = state.employees.find((e) => e._id === id);
        if (emp) emp.status = status;
      });
  },
});

export default attendanceSlice.reducer;
