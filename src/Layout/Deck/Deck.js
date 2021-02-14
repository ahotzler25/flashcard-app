import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { deleteDeck, readDeck } from '../../utils/api/index';
import DeckCard from './DeckCard';


export default function Deck({ updateDecks }) {

    const [ currentDeck, setCurrentDeck] = useState({});
    const [ numberOfCards, setNumberOfCards ] = useState(0);
    const { deckId } = useParams();
    const history = useHistory();


    // WRITE DELETE HANDLER
    const handleDelete = async() => {
        const toDelete = window.confirm(
            "Delete this deck? \n \n \n You will not be able to recover it."
        );
        if (toDelete) {
            await deleteDeck(currentDeck.id);
            updateDecks(-1);
            history.push('/');
        }
    }

    const updateCards = (value) => {
        setNumberOfCards(() => numberOfCards + value)
    };

    // INITIALIZE THE DECK USING PARAMS
    useEffect(() => {
        const abortController = new AbortController();
        const loadDeck = async () => {
            const getDeck = await readDeck(deckId, abortController.signal);
            setCurrentDeck(() => getDeck);
        }
        loadDeck();
        return () => abortController.abort;
    }, [numberOfCards, deckId]);


    if(currentDeck.id) {
    return (
        <div>
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item active'>
                        {currentDeck.name}
                    </li>
                </ol>
            </nav>
            <div className='card'>
                <h2>{currentDeck.name}</h2>
                <p>{currentDeck.description}</p>

                <div className='d-flex'>
                    <Link to={`/decks/${currentDeck.id}/edit`}> 
                        <button className='btn btn-secondary'>Edit</button>
                    </Link>            
                    <Link to={`/decks/${currentDeck.id}/study`}>
                        <button className='btn btn-primary'>Study</button>
                    </Link>
                    <Link to={`/decks/${currentDeck.id}/cards/new`}>
                        <button className='btn btn-primary'>Add Cards</button>
                    </Link>
                        <button onClick={handleDelete} className='btn btn-danger'>Delete</button>
                </div>
            </div>

            <h2>Cards</h2>
            <div>
                {/* Map over cards to display here? */}
                {currentDeck.cards.map((card) => (
                    <DeckCard 
                        key={card.id} id={card.id} front={card.front} 
                        back={card.back} updateCards={updateCards} 
                    />
                ))}
            </div>
        </div>
        )
    } else {
        return <p>Loading...</p>
    }

    // NEED THIS ELSE STATEMENT ELSE MAP IS UNDEFINED
}