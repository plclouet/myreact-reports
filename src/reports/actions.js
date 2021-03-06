import {
  CREATE_REPORT,
  RETRIEVE_REPORTS,
  UPDATE_REPORT,
  DELETE_REPORT,
  FILTER_REPORTS,
} from "./actionTypes";

import ReportsService from "./reportsService";

export const createReport =
  (nom, prenom, titre, examen, rdvDate, indication, protocole, contenu, incomplet) => async (dispatch) => {
    try {
      const res = await ReportsService.create({
        nom,
        prenom,
        titre,
        examen,
        rdvDate,
        indication,
        protocole,
        contenu,
        incomplet
      });

      dispatch({
        type: CREATE_REPORT,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrieveReports = () => async (dispatch) => {
  try {
    const res = await ReportsService.getAll();

    dispatch({
      type: RETRIEVE_REPORTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const filterReports = (query) => async (dispatch) => {
  try {
    const res = await ReportsService.getFilter(query);

    dispatch({
      type: FILTER_REPORTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const updateReport = (id, data) => async (dispatch) => {
  try {
    const res = await ReportsService.update(id, data);

    dispatch({
      type: UPDATE_REPORT,
      payload: data,
    });
    
    return Promise.resolve(res.data);
    
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteReport = (id) => async (dispatch) => {
  try {
    await ReportsService.delete(id);

    dispatch({
      type: DELETE_REPORT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
