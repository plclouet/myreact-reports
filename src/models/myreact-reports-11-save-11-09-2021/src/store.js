import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "./reports/reducers";

export default configureStore({
  reducer: {
    reports: reportReducer,
  },
});
