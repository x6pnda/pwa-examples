import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Articles } from './containers/Articles/Articles';
import { Test } from './containers/Test/Test';
import * as serviceWorkerRegistration from './scripts/serviceWorkerRegistration';
import './styles/_global.scss';
import './styles/_normalize.scss';
import './styles/_variables.scss';

ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path='/' component={Articles}></Route>
            <Route exact path='/test' component={Test}></Route>
		</Switch>
	</Router>,
	document.getElementById('root')
);

serviceWorkerRegistration.register();