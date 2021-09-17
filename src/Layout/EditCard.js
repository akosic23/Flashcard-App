import React, { useEffect } from "react"
import { useHistory, useParams, Link } from "react-router-dom"
import { readDeck, readCard, createCard } from "../utils/api/index"
import FormComponent from "./FormComponent";

function EditCard ({ deck, setDeck, cards, setCards}) {
    const history = useHistory();
    const { deckId, cardsId } = useParams();

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
    }, [deckId])

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        async function getDeck() {
            try {
                const response = await readCard(cardsId, signal)
                setCards(response)
            } catch (error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        getDeck()   
    }, [deckId])

    return (
        <div>
            <Link to="/">Home</Link>
            <span>{" "}/{" "}</span>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            <span>{" "}/{" "}Edit Card {cardsId}</span>
            <FormComponent cards={cards} cardsId={cardsId} deck={deck} deckId={deckId} setCards={setCards} setDeck={setDeck} history={history} type="editCard"  />
        </div>
    )
}

export default EditCard