import React from 'react';
import { Link, useRouteMatch} from 'react-router-dom';
import { deleteCard } from '../../utils/api';

export default function DeckCard({ id, front, back, updateCards }) {
    const { url } = useRouteMatch();
    

    // DELETE BUTTON
    const handleCardDelete = async () => {
        const toDelete = window.confirm(
            "Delete this card? \n \n \n You will not be able to recover it."
        );
        if (toDelete) {
            await deleteCard(id);
            updateCards(-1); // Re-renders cardlist after card deletion
        };
    };

    // RETURN RENDERED CARDS
    return (
        <div className='card'>
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <p className='card-text'>{front}</p>
                    <p className='card-text'>{back}</p>
                </div>
                <div className='d-flex justify-content-end'>
                    <Link to={`${url}/cards/${id}/edit`}>
                        <button className='btn btn-secondary'>Edit</button>
                    </Link>
                        <button onClick={handleCardDelete} className='btn btn-danger'>Delete</button>
                </div>
            </div>
        </div>
    )
}