import {
  CREATE_PROTOCOLE,
  RETRIEVE_PROTOCOLES,
  UPDATE_PROTOCOLE,
  DELETE_PROTOCOLE,
  FILTER_PROTOCOLES
 
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
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

 export const updateProtocole = (id, data) => async (dispatch) => {
  try {
    const res = await ProtocolesService.update(id, data);

    dispatch({
      type: UPDATE_PROTOCOLE,
      payload: data,
    });
    
    return Promise.resolve(res.data);
    
  } catch (err) {
    return Promise.reject(err);
  }
}; 

 export const deleteProtocole = (id) => async (dispatch) => {
  try {
    await ProtocolesService.delete(id);

    dispatch({
      type: DELETE_PROTOCOLE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
}; 

export const filterProtocoles = (query) => async (dispatch) => {
  try {
    const res = await ProtocolesService.getFilter(query);

    dispatch({
      type: FILTER_PROTOCOLES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};
