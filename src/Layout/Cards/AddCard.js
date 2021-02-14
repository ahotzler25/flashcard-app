import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api';

export default function AddCard() {
    const { deckId } = useParams();
    const initialFormData = { front: "", back: "" };
    const [ formData, setFormData ] = useState(initialFormData)
    const [ deck, setDeck ] = useState({});


    // WRITE SUBMIT HANDLER AND BUTTON
    // UPDATE DECKS ACCORDINGLY 

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    const handleCardSubmit = async (event) => {
        event.preventDefault();
        await createCard(deckId, formData);
        setFormData(initialFormData);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const getDeck = async () => {
            const deck = await readDeck(deckId, abortController.signal);
            setDeck(() => deck);
        };
        getDeck();
        return () => abortController.abort();
    }, [deckId])

    return (
        <div>
            <nav className='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Add Card
                    </li>
                </ol>
            </nav>
            <h3>{deck.name}: Add Card</h3>
            <div className='form-group'>
                <form onSubmit={handleCardSubmit}>
                    <h6>Front</h6>
                        <label htmlFor='front' />
                        <textarea name='front' placeholder='Front Side' 
                            value={formData.front} onChange={handleChange} required />
                    <h6>Back</h6>
                    <label htmlFor='back' />
                        <textarea name='back' placeholder='Back Side' 
                        value={formData.back} onChange={handleChange} required />
                    <Link to={`/decks/${deckId}`} >
                        <button className='btn btn-secondary'>Done</button>
                    </Link>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    )
};