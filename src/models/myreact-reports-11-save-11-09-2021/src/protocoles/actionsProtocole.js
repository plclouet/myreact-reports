import {
  CREATE_PROTOCOLE,
  RETRIEVE_PROTOCOLES,
 
} from "./actionTypesProtocole";

import ProtocolesService from "./protocolesService";

 export const createProtocole =
  (protocoleTitre, protocoleContent) => async (dispatch) => {
    try {
      const res = await ProtocolesService.create({
        protocoleTitre,
        protocoleContent
      });

      dispatch({
        type: CREATE_PROTOCOLE,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }; 

export const retrieveProtocoles = () => async (dispatch) => {
  try {
    const res = await ProtocolesService.getAll();

    dispatch({
      type: RETRIEVE_PROTOCOLES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

/* export const updateReport = (id, data) => async (dispatch) => {
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
}; */

/* export const deleteReport = (id) => async (dispatch) => {
  try {
    await ReportsService.delete(id);

    dispatch({
      type: DELETE_REPORT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
}; */
