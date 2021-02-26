import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api';
import CardForm from './CardForm';

export default function AddCard({ selectedDeck, setSelectedDeck }) {
    const { deckId } = useParams();
    const initialFormData = { front: "", back: "" };
    const [ formData, setFormData ] = useState({ ...initialFormData});

    // LIFT THIS UP TO PARENT COMPONENT 
    // const [ deck, setDeck ] = useState({});


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
            setSelectedDeck(() => deck);
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
                            {selectedDeck.name}
                        </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Add Card
                    </li>
                </ol>
            </nav>
            <h3>{selectedDeck.name}: Add Card</h3>
                <CardForm handleChange={handleChange} handleCardSubmit={handleCardSubmit} cardData={formData} selectedDeck={selectedDeck} />
            </div>
    )
};