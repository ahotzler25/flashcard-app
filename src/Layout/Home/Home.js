import React, {useState, useEffect} from 'react';
import DeckList from './DeckList';
import { Link } from 'react-router-dom';
import { listDecks } from '../../utils/api/index';


export default function Home({numberOfDecks, updateDecks}) {
    const [ listOfDecks, setListOfDecks ] = useState([]);

    // DECKS LIST
    useEffect(() => {
  
      const abortController = new AbortController();
      // Create async function to fetch listDecks data
      const loadListOfDecks = async () => {
        const decks = await listDecks(abortController.signal);
        setListOfDecks(() => decks);
      };
  
      loadListOfDecks();
      return () => abortController.abort();
      // Something causes an infinite loop when passed in state var
      // POTENTIALLY FIXED
    }, [numberOfDecks]);


    return (
        <div>
            <Link to='/decks/new' className='btn btn-primary btn-lg'>+ Create Deck</Link> 
            {/* LOOP THROUGH DECKS AND DISPLAY THEM */}
                {listOfDecks.map(({id, name, description, cards}) => (
                    <DeckList 
                        key={id} id={id} description={description} 
                        name={name} cards={cards} updateDecks={updateDecks}
                    />
                ))}
        </div>
    )
}