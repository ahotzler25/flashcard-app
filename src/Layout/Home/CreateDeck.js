import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api';

// IMPORT USEHISTORY TO RETURN TO HOME AFTER SUBMISSION
// CALL UPDATEDECK FUNCTION? DECKLISTS FUNCTION?
// Create initialFormState FOR FORM SUBMISSION
// Create OnSubmitHandler

export default function CreateDeck() {
    const history = useHistory();
    const initialFormData = { name: "", description: "" };
    const [ formData, setFormData ] = useState(initialFormData);

    // WRITE FUNCTIONALITY
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }
    
    const onSubmitHandler = async(event) => {
        event.preventDefault();
        const deckNumber = await createDeck(formData);
        // console.log(deckNumber);
        history.push(`/decks/${deckNumber.id}`);
    };

    

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
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="card-name">Deck Name:</label>
                <input name='name' type="text" className='form-control' onChange={handleChange}
                    value={formData.name} placeholder="Deck Name" required />
                <br />
                <label htmlFor="card-name">Description:</label>
                <textarea name='description' onChange={handleChange} value={formData.description}
                    rows="3" placeholder="Brief description of the deck" required />
                
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/'>
                    <button className='btn btn-secondary mr-2'>Cancel</button>
                </Link>
            </form>
        </div>
    )
};