import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api/index';
import StudyCard from './StudyCard';

export default function Study() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();

    // Initialize/display deck
    useEffect(() => {
        const abortController = new AbortController();
        const loadDeck = async () => {
            const getDeck = await readDeck(deckId);
            setDeck(() => getDeck);
        };

        loadDeck();
        return () => abortController.abort;
    }, [deckId]);


    // HOW DOES THIS WORK? STUDY
    if (Object.keys(deck).length) {
        return (
            <div>
                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='breadcrumb-item'>
                            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                        </li>
                        <li className='breadcrumb-item active'>
                            Study
                        </li>
                    </ol>
                </nav>
                <h2>{deck.name}: Study</h2>
                    {/* DISPLAY INDIVIDUAL CARDS FOR STUDY */}
                    <StudyCard cards={deck.cards} />
            </div>
        );
    } else {
        return <p>Loading...</p>
    }
}