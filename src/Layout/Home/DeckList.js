import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteDeck } from '../../utils/api/index';

// We map over each deck to render in Home component

export default function DeckList({id, name, description, cards, updateDecks}) {
    const history = useHistory();

    const handleDelete = async (event) => {

        // EVENT PREVENT DEFAULT NEEDED?
        // event.preventDefault();
        const toDelete = window.confirm(
            "Delete this deck? \n \n \n You will not be able to recover it."
        );
        if (toDelete) {
            await deleteDeck(id);
            updateDecks(-1);
            history.push('/');
        };
    };
    

    return (
        <div className='card'>
            <div className='card-body'>
                <h3 className='card-title'>{name}</h3>
                <div>{cards.length} cards</div>
            </div>
            <p>{description}</p>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Link to={`decks/${id}`} className='btn btn-secondary'>View</Link>
                    <Link to={`decks/${id}/study`} className='btn btn-primary'>Study</Link>
                </div>
                <div>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>  
    );
};