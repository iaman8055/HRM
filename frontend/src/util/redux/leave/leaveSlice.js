// src/util/redux/leave/leaveSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// Fetch all leaves
export const fetchLeaves = createAsyncThunk(
  "leave/fetchLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/leave");
      return res.data.leaves;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add new leave
export const addLeave = createAsyncThunk(
  "leave/addLeave",
  async (formData, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append("employeeId", formData.employeeId);
      data.append("fullName", formData.fullName);
      data.append("designation", formData.designation);
      data.append("date", formData.date);
      data.append("reason", formData.reason);
      data.append("docs", formData.documents);
      const res = await API.post("/leave/add", data);
      return res.data.leave;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update leave status
export const updateLeaveStatus = createAsyncThunk(
  "leave/updateLeaveStatus",
  async ({ leaveId, status }, { rejectWithValue }) => {
    try {
      await API.put(`/leave/${leaveId}`, { status: status.toLowerCase() });
      return { leaveId, status };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    leaves: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchLeaves
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addLeave
      .addCase(addLeave.fulfilled, (state, action) => {
        state.leaves.push(action.payload);
      })
      // updateLeaveStatus
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        const { leaveId, status } = action.payload;
        const leave = state.leaves.find((l) => l._id === leaveId);
        if (leave) leave.status = status;
      });
  },
});

export default leaveSlice.reducer;
