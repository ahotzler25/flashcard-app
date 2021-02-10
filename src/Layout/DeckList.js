import React from 'react';
import {Link} from 'react-router-dom';

export default function DeckList({listOfDecks = []}) {

    
    return (
        <div>
            <Link to='/decks/new' className='btn btn-primary btn-lg'>+Add Deck</Link>
            {listOfDecks.map((deck) => {
                return (
                    <div className='card'>
                        <div className='card-body'>
                            <h3 className='card-title'>{deck.name}</h3>
                            Deck #{deck.id}
                        </div>
                        <p>{deck.description}</p>
                        <div>
                            <Link to={`decks/${deck.id}`}></Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}