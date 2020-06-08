import {
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAILURE,
  ADD_CLIENTS_SUCCESS,
  ADD_CLIENTS_FAILURE,
  DELETE_CLIENT_SUCCESS
} from '#/store/actions/actionTypes';

const initialState = {
  isLoading: false,
  clientList: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
    case ADD_CLIENTS_FAILURE:
    case GET_CLIENTS_FAILURE:
      return {
        ...state,
        isLoading: true
      };
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clientList: [...action.payload]
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clientList: [
          ...state.clientList.filter(client => client.id !== action.payload)
        ]
      };
    case ADD_CLIENTS_SUCCESS:
      return {
        ...state,
        clientList: [...state.clientList, action.payload],
        isLoading: false
      };
    default:
      return state;
  }
}
