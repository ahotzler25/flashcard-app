import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';


export default function Study() {

    const [deck, setDeck] = useState({});
    const { deckId } = useParams();

    // Initialize/display deck

    useEffect(() => {
        const abortController = new AbortController();
        const loadDeck = async () => {
            const newDeck = await readDeck(deckId);
            setDeck(() => newDeck);
        };

        loadDeck();
        return () => abortController.signal;
    }, [deckId])


    return (
        <div>
            <h2>Study Page</h2>
            <p>DeckId: {deckId}</p>
            <p>Deck Name: {deck.name}</p>
            
        </div>
    )
}