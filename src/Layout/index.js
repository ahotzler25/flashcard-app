import React, {Fragment, useState, useEffect} from "react";
import {Switch, Route} from 'react-router-dom';
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from './DeckList';
import Study from './Study';
import { listDecks } from '../utils/api/index';

function Layout() {
  const [ listOfDecks, setListOfDecks ] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    // Create async function to fetch listDecks data
    const loadDecklists = async () => {
      const decks = await listDecks(abortController.signal);
      setListOfDecks(() => decks);
    }

    loadDecklists();
    return () => abortController.abort();
  }, [listOfDecks])

  return (
    
    <Fragment>
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Header />
        <Switch>
          <Route path="/" exact={true}>
            <DeckList listOfDecks={listOfDecks}/>
          </Route>
          <Route>
            <Study path="/decks/:deckId/study" />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
