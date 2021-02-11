import React from 'react';
import {Link} from 'react-router-dom';

// IMPORT USEHISTORY TO RETURN TO HOME AFTER SUBMISSION
// CALL UPDATEDECK FUNCTION? DECKLISTS FUNCTION?
// Create INITIALFORMDATA STATE FOR FORM SUBMISSION

export default function CreateDeck() {
    return (
        // Bootstrap Nav bar: done
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item text-primary">
                    <Link to="/"> Home </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page"> Create Deck </li> 
                </ol>
            </nav>
            <h2>Create Deck:</h2>

        {/* CREATE/ADD ONSUBMIT HANDLER; USEHISTORY INSIDE TO RETURN HOME */}
            <form>
                <label htmlFor="card-name">
                    Deck Name:
                <input type="text" placeholder="Deck Name" required></input>
                </label>
                <br />
                <label htmlFor="card-name">
                    Description:
                <textarea rows="3" col="0" placeholder="Brief description of the deck" required></textarea>
                </label>
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/'>
                    <button className='btn btn-secondary mr-2'>Cancel</button>
                </Link>
            </form>
        </div>
    )
};