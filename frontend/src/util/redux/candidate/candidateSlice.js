// src/redux/slices/candidateSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

// Fetch candidates
export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/candidate");
      return res.data.candidates;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add candidate
export const addCandidate = createAsyncThunk(
  "candidates/addCandidate",
  async (formData, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.emailAddress);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("position", formData.position);
      data.append("status", "New");
      data.append("experience", formData.experience);
      data.append("resumeUrl", formData.resume);

      const res = await API.post("/candidate/add", data);
      return res.data.candidate;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update candidate status
export const updateCandidateStatus = createAsyncThunk(
  "candidates/updateCandidateStatus",
  async ({ id, newStatus }, { rejectWithValue }) => {
    try {
      await API.put(`/candidate/${id}`, { status: newStatus.toLowerCase() });
      return { id, status: newStatus.toLowerCase() };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete candidate
export const deleteCandidate = createAsyncThunk(
  "candidates/deleteCandidate",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/candidate/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const candidateSlice = createSlice({
  name: "candidates",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCandidate.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCandidateStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const candidate = state.list.find((c) => c._id === id);
        if (candidate) candidate.status = status;
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      });
  },
});

export default candidateSlice.reducer;
