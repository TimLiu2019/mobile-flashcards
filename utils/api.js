import AsyncStorage from "@react-native-async-storage/async-storage";

// return all of the decks along with their titles,
// questions, and answers

export function getDecks() {
  const decks = async () => {
    try {
      const decks = await AsyncStorage.getItem("DECKS");
      if (decks !== null) {
        // We have data!!
        console.log("get decks: ", decks);
        return decks;
      }
      return {};
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  decks();
}

// take in a single id argument
//and return the deck associated with that id.
export function getDeck() {}

//take in a single title argument and add it to the decks.
export async function saveDeckTitle(title) {
  let decksSting = getDecks();
  if (decksSting !== undefined) {
    let deckss = JSON.parse(decksSting);
    console.log("deck string", deckss);
  }

  let decks = {};
  //   if(decksSting !== null){
  //      decks = JSON.parse(decksSting);
  //   }

  let newDecks = { ...decks, title };
  console.log("new decks", newDecks);
  try {
    await AsyncStorage.setItem("DECKS", JSON.stringify(newDecks));
    //  const value = await AsyncStorage.getItem("DECKS");
    const value = getDecks();
    const deck = JSON.parse(value);
    console.log("get item", deck);
  } catch (error) {
    // Error saving data
  }
}

//  take in two arguments, title and card, and will
//add the card to the list of questions
//for the deck with the associated title.

export function addCardToDeck() {}
