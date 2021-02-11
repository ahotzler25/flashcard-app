import React, { Fragment } from "react";
import {Switch, Route} from 'react-router-dom';
import Header from "./Header";
import NotFound from "./NotFound";
import Home from './Home/Home';
import Study from './Deck/Study';
import CardList from './Cards/CardList';
import AddDeck from './Deck/AddDeck';


// DO ALL ROUTING HERE
function Layout() {


  return (
    <Fragment>
      <div className="container">
        <Header />
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path='/decks/new'>
            <AddDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path='/decks/:deckId'>
            <CardList />
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
