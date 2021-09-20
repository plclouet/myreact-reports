import {
  CREATE_REPORT,
  RETRIEVE_REPORTS,
  UPDATE_REPORT,
  DELETE_REPORT,
  FILTER_REPORTS,
} from "./actionTypes";

const initialState = [];

function reportReducer(reports = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REPORT:
      return [...reports, payload];

    case RETRIEVE_REPORTS:
      return payload;

    case UPDATE_REPORT:
      return reports.map((report) => {
        if (report.id === payload.id) {
          return {
            ...report,
            ...payload,
          };
        } else {
          return report;
        }
      });

    case DELETE_REPORT:
      return reports.filter(({ id }) => id !== payload.id);

    case FILTER_REPORTS:
      return payload;

    default:
      return reports;
  }
}

export default reportReducer;
