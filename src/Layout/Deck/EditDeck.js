import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { updateDeck, readDeck } from '../../utils/api/index';

export default function EditDeck() {
    const initialState = { name: "", description: "" };
    const [ formData, setFormData ] = useState(initialState);
    const [currentDeck, setCurrentDeck ] = useState({});
    const history = useHistory();
    const { deckId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        const getDeck = async () => {
            const deck = await readDeck(deckId, abortController.signal);
            setCurrentDeck(() => deck);
            setFormData({
                id: deckId,
                name: deck.name,
                description: deck.description
            });
        };
        getDeck();
        return() => abortController.abort();
    }, [deckId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const deckNumber = await updateDeck(formData);
        history.push(`/decks/${deckNumber.id}`);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-label='page'>
                        <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
                    </li>
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='form-group'>Name</label>
                    <input name='name' type='text' className='form-control'
                        value={formData.name} placeholder="Deck Name" 
                        onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor='form-group'>Description</label>
                    <textarea name='description' rows='5' className='form-control' 
                        value={formData.description} placeholder='Brief description of the deck.' 
                        onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <Link to={`/decks/${deckId}`}>
                        <button className="btn btn-secondary mr-2">Cancel</button>
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    </div>
            </form>
        </div>
    );
}