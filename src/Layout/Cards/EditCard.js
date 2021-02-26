import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api/index';
import CardForm from './CardForm';

export default function EditCard({ selectedDeck, setSelectedDeck}) {
    const { deckId, cardId } = useParams();
    
    
    // const [ currentDeck, setCurrentDeck ] = useState({});
    const [ currentCard, setCurrentCard ] = useState({});
    const history = useHistory();
    // Need readDeck to access currentDeck for <Link />


    const handleChange = (event) => {
        setCurrentCard({ ...currentCard, [event.target.name]: event.target.value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        updateCard(currentCard);
        history.push(`/decks/${deckId}`);
    };

    useEffect(() => {
        const abortController = new AbortController();
        const getDeck = async () => {
            const deck = await readDeck(deckId, abortController.signal);
            const card = await readCard(cardId);
            setSelectedDeck(() => deck);
            setCurrentCard(() => card);
        };
        getDeck();
        return () => abortController.abort();
    }, [deckId, cardId, setSelectedDeck]);

    return (
        <div className='container'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to='/'>
                  <i className='fas fa-home'></i> Home
                </Link>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                <Link to={`/decks/${selectedDeck.id}`}>{selectedDeck.name}</Link>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                {'Edit Card ' + cardId}
              </li>
            </ol>
          </nav>
          <h3>Edit Card</h3>
          <CardForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            cardData={currentCard}
            selectedDeck={selectedDeck}
          />
        </div>
      )
    };