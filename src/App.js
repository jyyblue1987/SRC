import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';

import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";

  // https://609c5f2004bffa001792ce08.mockapi.io/
function App() {
  	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/profile/:id">
						<Profile />
					</Route>
				</Switch>
			</div>
		</Router>
  	);
}

export default App;
