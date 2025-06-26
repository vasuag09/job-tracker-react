import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    addJob(state, action) {
      state.jobs.push(action.payload);
    },
    removeJob(state, action) {
      const idToRemove = Number(action.payload);
      state.jobs = [...state.jobs.filter((job) => job.id !== idToRemove)];
    },
    updateJob(state, action){
        state.jobs = state.jobs.map((job)=>{
            return (job.id !== action.payload.id ? job : action.payload.updatedJob)
        })
    }
  },
});
export const jobActions = jobSlice.actions;
export default jobSlice.reducer;
