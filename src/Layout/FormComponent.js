import React from "react";
import { createCard, readDeck, updateCard } from "../utils/api/index"

function FormComponent({deck, deckId, cards, setCards, type, history}) {

    const handleChange = ({target}) => {
        setCards({
            ...cards, [target.name]: target.value,
        })
    }

    function handleSave(event) {
        event.preventDefault();
        async function updateCards() {
            await createCard(deckId, cards)
        }
        updateCards();
        setCards({
            front:"",
            back:"",
            deckId: deckId
        })
    }
    
    function handleDone(event) {
      event.preventDefault();
      history.push(`/decks/${deck.id}`)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        updateCard(cards)
        history.push(`/decks/${deck.id}`)
    }

    if (type === 'addCard') {
        return (
            <form>
                <div className= "form-group">
                    <label className="form-label" htmlFor="name">Front</label>
                        <textarea
                        type="text"
                        className="form-control"
                        id="front"
                        placeholder="Front side of card"
                        required
                        name="front"
                        onChange={handleChange}
                        value={cards.front}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">Back</label>
                        <textarea
                        type="text"
                        className="form-control input-lg"
                        id="back"
                        placeholder="Back side of card"
                        required
                        name="back"
                        onChange={handleChange}
                        value={cards.back}/>
                </div>
                <button type="submit" className="btn btn-secondary" onClick={handleDone}>Done</button>
                <button type="submit" className="btn btn-primary" onClick={handleSave}>Save</button>
            </form>
        )
    }
    if (type === 'editCard') {
        return (
            <div>
                <form>
                    <div className= "form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                        <textarea
                        type="text"
                        className="form-control"
                        id="front"
                        placeholder={cards.front}
                        name="front"
                        onChange={handleChange}
                        value={cards.front}/>
                    </div>
                    <div className="form-group">
                    <label className="form-label" htmlFor="description">Description</label>
                        <textarea
                        type="text"
                        className="form-control input-lg"
                        id="back"
                        placeholder={cards.back}
                        name="back"
                        onChange={handleChange}
                        value={cards.back}/>
            </div>
                <button type="submit" className="btn btn-secondary" onClick={handleDone}>Cancel</button>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default FormComponent;