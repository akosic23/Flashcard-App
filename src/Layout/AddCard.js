import React, {useEffect} from "react";
import { useHistory, useParams } from "react-router-dom"
import { readDeck} from "../utils/api/index"
import FormComponent from "./FormComponent";

function AddCard({deck, setDeck, cards, setCards}) {
    const history = useHistory();
    const {deckId} = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        async function getDeck() {
            try {
                const response = await readDeck(deckId, signal)
                setDeck(response)
            } catch (error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getDeck()
        
        
    }, [deckId, setDeck])

    return (
        <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
            <FormComponent cards={cards} deck={deck} deckId={deckId} setCards={setCards} setDeck={setDeck} history={history} type="addCard" />
        </div>
    )
}

export default AddCard