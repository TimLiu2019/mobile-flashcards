import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from "../actions";
import produce from "immer";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS: {
      return { ...state, ...action.decks };
    }
    case ADD_DECK: {
      return produce(state, draft => {
        draft[action.title] = { title: action.title, questions: [] };
      });
    }
    case REMOVE_DECK: {
      return produce(state, draft => {
        delete draft[action.title];
      });
    }
    case ADD_CARD:
      return produce(state, draft => {
        draft[action.title].questions.push({
          question: action.question,
          answer: action.answer
        });
      });
    default:
      return state;
  }
}
