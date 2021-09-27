import {
  CREATE_PROTOCOLE,
  RETRIEVE_PROTOCOLES,
  UPDATE_PROTOCOLE,
  DELETE_PROTOCOLE,
  FILTER_PROTOCOLES,
} from "./actionTypesProtocole";

const initialState = [];

function protocoleReducer(protocoles = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROTOCOLE:
      return [...protocoles, payload];

    case RETRIEVE_PROTOCOLES:
      return payload;

    case UPDATE_PROTOCOLE:
      return protocoles.map((protocole) => {
        if (protocole.id === payload.id) {
          return {
            ...protocole,
            ...payload,
          };
        } else {
          return protocole;
        }
      });

    case DELETE_PROTOCOLE:
      return protocoles.filter(({ id }) => id !== payload.id);

    case FILTER_PROTOCOLES:
      return payload;

    default:
      return protocoles;
  }
}

export default protocoleReducer;
