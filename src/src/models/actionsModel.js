import {
  CREATE_MODEL,
  RETRIEVE_MODELS,
 
} from "./actionTypesModel";

import ModelsService from "./modelsService";

 export const createModel =
  (modelTitre, modelContent) => async (dispatch) => {
    try {
      const res = await ModelsService.create({
        modelTitre,
        modelContent
      });

      dispatch({
        type: CREATE_MODEL,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }; 

export const retrieveModels = () => async (dispatch) => {
  try {
    const res = await ModelsService.getAll();

    dispatch({
      type: RETRIEVE_MODELS,
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
