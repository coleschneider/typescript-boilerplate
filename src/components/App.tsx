import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch, RouteProps } from 'react-router-dom';
import * as React from 'react';
import { Nav } from './Common/Nav';

const HomePage = () => <h1>home</h1>;
export interface CustomLink extends RouteProps {
  title: string;
  to: string;
  identifier: string;
  exact?: boolean;
  replace?: boolean;
}
const Header = () => {
  return (
    <div className="header-wrapper">
      <Route
        path="/:page"
        render={({ match }) => {
          console.log();
          return <h1>{match.params.page[0].toUpperCase() + match.params.page.slice(1)}</h1>;
        }}
      />
    </div>
  );
};
const App = () => (
  <Router>
    <div>
      <Nav />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route render={({ match }) => match && <h1>Not Found</h1>} />
      </Switch>
    </div>
  </Router>
);

export default hot(module)(App);
