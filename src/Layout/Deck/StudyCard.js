import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

export default function StudyCard({ cards }) {
    const initialState = { flipped: false , currentCard: 0};
    const [session, setSession] = useState(initialState);
    const { deckId } = useParams();
    const history = useHistory();

    const handleNext = () => {
        if (session.currentCard < cards.length - 1) {
            setSession({
                ...session,
                currentCard: session.currentCard + 1,
                flipped: false
            });
        } else {
            window.confirm(
                'Restart cards? \n \n \n Click "cancel" to return to the home page.'
            )
                ? setSession(initialState) : history.push('/')
        }
    }

    if (cards.length < 3) {
        return (
            <div>
                <h5>Not enough cards</h5>
                <p>You need at least three cards to study.</p>
                <p>There are {cards.length} in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`}>
                    <button className='btn btn-primary'>Add Cards</button>
                </Link>
            </div>
        )
    } else {
        return (
            <div>
                <div className='card'>
                    <h5>Card {session.currentCard + 1} of {cards.length} </h5>
                </div>
                <button onClick={handleNext}>Next</button>
            </div>
        )
    };
};