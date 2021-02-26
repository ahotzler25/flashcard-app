import React, { Fragment, useState } from "react";
import { Switch, Route } from 'react-router-dom';
import Header from "./Header";
import NotFound from "./NotFound";
import Home from './Home/Home';
import Study from './Deck/Study';
import Deck from './Deck/Deck';
import CreateDeck from './Home/CreateDeck';
import AddCard from './Cards/AddCard';
import EditCard from './Cards/EditCard';
import EditDeck from './Deck/EditDeck';


// DO ALL ROUTING HERE
function Layout() {

  const [numberOfDecks, setNumberOfDecks] = useState(0);
  const [selectedDeck, setSelectedDeck ] = useState([]);

  // KEEPS HOMEPAGE DECKLIST UPDATED
  const updateDecks = (value) => {
    setNumberOfDecks(() => numberOfDecks + value);
  };

  return (
    <Fragment>
      <div className="container">
        <Header />
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home updateDecks={updateDecks} numberOfDecks={numberOfDecks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path='/decks/new'>
            <CreateDeck />
          </Route>
          <Route path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route path='/decks/:deckId' exact={true}>
            <Deck updateDecks={updateDecks} />
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} />
          </Route>
          <Route path='/decks/:deckId/cards/new'>
            <AddCard selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} />
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
