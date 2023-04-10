import * as ReactDOMClient from 'react-dom/client';

import App from './App';
import {default as React} from 'react';

const startApp = (info) => {
	import(/* webpackChunkName: "app_config" */ './state/config').then(({CONFIG}) => {
		const root = ReactDOMClient.createRoot(document.getElementById('root'));
		root.render(<App CONFIG={CONFIG}/>);
	});
};

startApp(null);
