import {
  CREATE_MODEL,
  RETRIEVE_MODELS,
  UPDATE_MODEL,
  DELETE_MODEL,
  FILTER_MODELS,
} from "./actionTypesModel";

const initialState = [];

function modelReducer(models = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_MODEL:
      return [...models, payload];

    case RETRIEVE_MODELS:
      return payload;

    case UPDATE_MODEL:
      return models.map((model) => {
        if (model.id === payload.id) {
          return {
            ...model,
            ...payload,
          };
        } else {
          return model;
        }
      });

    case DELETE_MODEL:
      return models.filter(({ id }) => id !== payload.id);

    case FILTER_MODELS:
      return payload;

    default:
      return models;
  }
}

export default modelReducer;
