import React from 'react';
import { Link } from 'react-router-dom';


export default function DeckList({id, name, description, cards}) {

    const handleDelete = (event) => {
        event.preventDefault();
        window.confirm("Delete this deck? You will not be able to recover it.");
    }
    

    return (
        <div>
            <div className='card'>
                <div className='card-body'>
                    <h3 className='card-title'>{name}</h3>
                    Deck #{id}: Some # of cards
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
        </div>
    );
};