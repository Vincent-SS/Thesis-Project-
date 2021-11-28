import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import {
  InfoPage, DetailPage, InputPage, TickerPage, NotFoundPage,
} from '../pages';
import Head from '../components/Head';

const Router = () => (
  <BrowserRouter>
    <Head />
    <Switch>
      <Route exact path="/" component={InputPage} />
      <Redirect from="/input" to="/" />
      <Route path="/info" component={InfoPage} />
      <Route path="/detail" component={DetailPage} />
      <Route path="/ticker" component={TickerPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;