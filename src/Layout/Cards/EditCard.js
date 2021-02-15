import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api/index';

export default function AddCard() {
    const { deckId, cardId } = useParams();
    const initialFormData = { front: "", back: "" };
    const [ formData, setFormData ] = useState(initialFormData);
    const [ currentDeck, setCurrentDeck ] = useState({});
    const [ currentCard, setCurrentCard ] = useState({});
    const history = useHistory();
    // Need readDeck to access currentDeck for <Link />


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard(formData);
        history.push(`/decks/${deckId}`);
    };

    useEffect(() => {
        const abortController = new AbortController();
        const getDeck = async () => {
            const deck = await readDeck(deckId, abortController.signal);
            const card = await readCard(cardId);
            setCurrentDeck(() => deck);
            setCurrentCard(() => card);
            setFormData({
                id: cardId,
                front: card.front,
                back: card.back,
                // WHY DO I NEED THE NUMBER KEYWORD HERE?
                deckId: Number(deckId)
            });
        };
        getDeck();
        return () => abortController.abort();
    }, [deckId, cardId]);

    return (
        <div>
            <nav className='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>Deck {currentDeck.name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-label='page'>Edit Card {currentCard.id}</li>
                </ol>
            </nav>
            <h3>Edit Card</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='front'><h6>Front</h6></label>
                    <textarea name='front' className='form-control' onChange={handleChange} 
                        value={formData.front} required />
                    <label htmlFor='back'><h6>Back</h6></label>
                        <textarea name='back' className='form-control' onChange={handleChange} 
                            value={formData.back} required />
                <div>
                    <Link to={`/decks/${deckId}`}>
                        <button className='btn btn-secondary'>Cancel</button>
                    </Link>
                    <button type='submit' className='btn btn-primary'>
                        Submit
                    </button>
                </div>
                </form>
        </div>

    )
}