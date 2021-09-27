import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "./reports/reducers";
import protocoleReducer from "./protocoles/reducers";
import modelReducer from "./models/reducers";

export default configureStore({
  reducer: {
    reports: reportReducer,
    protocoles: protocoleReducer,
    models: modelReducer
  },
});
