import AsyncStorage from "@react-native-async-storage/async-storage";
import produce from "immer";
// return all of the decks along with their titles,
// questions, and answers
const DECK_KEY ='Flashcards:decks'
const defaultDecks = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
};

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function getDefault() {
  return defaultDecks;
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_KEY).then(decks => {
    if (decks !== null) {
      return JSON.parse(decks);
    } else {
      AsyncStorage.setItem(DECK_KEY, JSON.stringify(defaultDecks));
      return defaultDecks;
    }
  });
}



//take in a single title argument and add it to the decks.
export async function saveDeckTitle(title) {
  let getDecks = {};
  try {
    const decks = await AsyncStorage.getItem(DECK_KEY);
    if (decks !== null) {

      getDecks = JSON.parse(decks);
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
  console.log("old decks", getDecks);

  let newDecks = {};
  if (getDecks !== null) {
    newDecks = {
      ...getDecks,
      [title]: { title: title, id: generateUID(), questions: [] }
    };
  } else {
    newDecks = { [title]: { title: title, id: generateUID(), questions: [] } };
  }

  
  try {
    await AsyncStorage.setItem(DECK_KEY, JSON.stringify(newDecks));

  } catch (error) {
    // Error saving data
  }
}

//  take in two arguments, title and card, and will
//add the card to the list of questions
//for the deck with the associated title.

export async function addCardToDeck(title, card) {
  let getDecks = {};
  try {
    const decks = await AsyncStorage.getItem("DECKS");
    if (decks !== null) {
      console.log("from get decks: ", JSON.parse(decks));
      getDecks = JSON.parse(decks);
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
  getDecks[title].questions.push(card);

  console.log("add card to decks", getDecks);
  try {
    await AsyncStorage.mergeItem("DECKS", JSON.stringify(getDecks));
  } catch (error) {
    // Error saving data
  }
}

export async function _removeDeck(title) {
  let getDecks = {};
  try {
    const decks = await AsyncStorage.getItem(DECK_KEY);
    if (decks !== null) {
      getDecks = JSON.parse(decks);
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
  console.log(" decks", getDecks);
  const newDecks = produce(getDecks, draft => {
    delete draft[title];
  });

  try {
    await AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(newDecks));
  } catch (error) {
    // Error saving data
  }
}
