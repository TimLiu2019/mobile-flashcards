export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const ADD_CARD = "ADD_CARD";

import { saveDeckTitle } from "../utils/api";
import { addCardToDeck } from "../utils/api";
import { getDecks, _removeDeck } from "../utils/api";

export function receiveDecks(decks) {
  return { type: RECEIVE_DECKS, decks };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function addCard({ title, question, answer }) {
  return {
    type: ADD_CARD,
    title,
    question,
    answer
  };
}

export function removeDeck(title) {
  return {
    type: REMOVE_DECK,
    title
  };
}
export function handleInitialData() {
  return dispatch => {
    return getDecks().then(decks => {
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

export function handleAddCard(title, question, answer) {
  return dispatch => {
    addCardToDeck(title, { question: question, answer: answer });
    dispatch(addCard({ title, question, answer }));
  };
}

export function handleRemoveDeck(title) {
  return dispatch => {
    _removeDeck(title);
    dispatch(removeDeck(title));
  };
}
