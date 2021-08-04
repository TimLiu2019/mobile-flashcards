import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "../actions";
import produce from "immer";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS: {
      return { ...state, ...action.decks };
    }
    case ADD_DECK: {
      return {
        ...state,
        ...action.title
      };
    }
    case ADD_CARD:
      return produce(state, draft => {
        draft[action.title].questions.push(action.card);
      });
    default:
      return state;
  }
}
