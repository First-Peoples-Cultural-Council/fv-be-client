import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "oidc-react";

const APIRequest = ({CONFIG}) => {

	const [APIResponse, setAPIResponse] = useState(null);
	const auth = useAuth();

	const [authenticated, setAuthenticated] = useState(false);
	const [token, setToken] = useState('');

	useEffect(() => {
		setAuthenticated(!!auth.userData);
		setToken(auth.userData?.access_token);
	}, [auth.userData]);


	const pokeAPI = async () => {
		try {
			const response = await axios.get(`${CONFIG.API_BASE}/api/1.0/user/current`, {
				headers: {
					'Authorization': `Bearer ${token}`
				},
				validateStatus: () => {
					return true
				},
			});
			setAPIResponse(response);
		} catch (e) {
			setAPIResponse(e);
		}
	}

	if (!authenticated) {
		return (<p>Not yet authenticated... (you should be automatically redirected)</p>)
	}

	if (!token || token.length == 0) {
		return (<p>No access token... that's unusual</p>);
	}

	return (
		<>

			<h4>User State</h4>
			<pre>
				{JSON.stringify(auth.userData, null, 2)}
			</pre>

			<hr/>

			<h4>Make an authenticated API call (Against Django)?</h4>

			<button onClick={() => pokeAPI()}>API Call</button>
			{
				APIResponse !== null && <>
					<h4>API Says:</h4>
					<pre>
				{JSON.stringify(APIResponse, null, 2)}
			</pre>
				</>
			}
		</>
	);
}


export {APIRequest};
