import AsyncStorage from "@react-native-async-storage/async-storage";

// return all of the decks along with their titles,
// questions, and answers

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
  return AsyncStorage.getItem("DECKS").then(decks => {
    if (decks !== null) {
      return JSON.parse(decks);
    } else {
      AsyncStorage.setItem("DECKS", JSON.stringify(defaultDecks));
      return defaultDecks;
    }
  });
}

// take in a single id argument
//and return the deck associated with that id.
export function getDeck() {}

//take in a single title argument and add it to the decks.
export async function saveDeckTitle(title) {
  let getDecks = {};
  try {
    const decks = await AsyncStorage.getItem("DECKS");
    if (decks !== null) {
      // We have data!!
      console.log("from get decks: ", JSON.parse(decks));
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

  console.log("new decks", newDecks);
  try {
    await AsyncStorage.setItem("DECKS", JSON.stringify(newDecks));
    //  const value = await AsyncStorage.getItem("DECKS");
    // const value = getDecks();
    console.log("get item", JSON.stringify(newDecks));
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
      // We have data!!
      console.log("from get decks: ", JSON.parse(decks));
      getDecks = JSON.parse(decks);
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
  console.log(" decks", getDecks);
  getDecks[title].questions.push(card);

  console.log("add card to decks", getDecks);
  try {
    await AsyncStorage.mergeItem("DECKS", JSON.stringify(getDecks));
    console.log("get item", JSON.stringify(getDecks));
  } catch (error) {
    // Error saving data
  }
}
