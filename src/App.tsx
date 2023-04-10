import React, {useEffect, useState} from "react";
import axios from "axios";
import {AuthProvider} from "oidc-react";
import {APIRequest} from "./APIRequest";

const App = ({CONFIG}) => {

	const OIDCConfig = {
		authority: CONFIG.AUTH_URL,
		clientId: CONFIG.AUTH_CLIENT_ID,
		redirectUri: CONFIG.REDIRECT_URI
	}

	return (<>
		<h2>React App</h2>

		<h4>Config:</h4>
		<hr/>

		<pre>
			{JSON.stringify(CONFIG, null, 2)}
		</pre>


		<pre>
			{JSON.stringify(OIDCConfig, null, 2)}
		</pre>


		<hr/>
		<AuthProvider {...OIDCConfig}>
			<APIRequest CONFIG={CONFIG}/>
		</AuthProvider>

	</>);
}

export default App;
