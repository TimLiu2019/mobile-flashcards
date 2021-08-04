export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
import { saveDeckTitle } from "../utils/api";
import { getDecks } from "../utils/api";

export function receiveDecks(decks) {
  return { type: RECEIVE_DECKS, decks };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function addCard({ title, card }) {
  return {
    type: ADD_CARD,
    card,
    title
  };
}
export function handleInitialData() {
  return dispatch => {
    return getDecks().then((decks) => {
      dispatch(receiveDecks(decks));
    });
  };
}

export function handleAddDeck(title) {
  return dispatch => {
    saveDeckTitle(title);
    dispatch(addDeck(title));
  };
}
