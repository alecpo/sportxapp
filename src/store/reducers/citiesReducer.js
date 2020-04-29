import {
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_SUCCESS
} from '#/store/actions/actionTypes';

const initialState = {
  favoriteList: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        favoriteList: [...state.favoriteList, action.payload]
      };
    case REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        favoriteList: [
          ...state.favoriteList.filter(city => city.id !== action.payload.id)
        ]
      };
    default:
      return state;
  }
}
