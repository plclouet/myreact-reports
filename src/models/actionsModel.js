import {
  CREATE_MODEL,
  RETRIEVE_MODELS,
  UPDATE_MODEL,
  DELETE_MODEL,
  FILTER_MODELS

 
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

 export const updateModel = (id, data) => async (dispatch) => {
  try {
    const res = await ModelsService.update(id, data);

    dispatch({
      type: UPDATE_MODEL,
      payload: data,
    });
    
    return Promise.resolve(res.data);
    
  } catch (err) {
    return Promise.reject(err);
  }
}; 

 export const deleteModel = (id) => async (dispatch) => {
  try {
    await ModelsService.delete(id);

    dispatch({
      type: DELETE_MODEL,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
}; 

export const filterModels = (query) => async (dispatch) => {
  try {
    const res = await ModelsService.getFilter(query);

    dispatch({
      type: FILTER_MODELS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};
