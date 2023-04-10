export interface AppConfig {
	API_BASE: string;

	AUTH_CLIENT_ID: string;
	AUTH_URL: string;

	REDIRECT_URI: string;
}

/* global CONFIGURATION_SOURCE */
declare global {
	const CONFIGURATION_SOURCE: string;
	const CONFIGURATION_API_BASE: string | null;
	const CONFIGURATION_AUTH_CLIENT_ID: string | null;
	const CONFIGURATION_AUTH_URL: string | null;
	const CONFIGURATION_REDIRECT_URI: string | null;
}

let CONFIG: AppConfig;

switch (CONFIGURATION_SOURCE) {
case 'Caddy':
	CONFIG = {
		API_BASE: '{{env "API_BASE"}}',
		AUTH_CLIENT_ID: '{{env "AUTH_CLIENT_ID"}}',
		AUTH_URL: '{{env "AUTH_URL"}}',
		REDIRECT_URI: '{{env "REDIRECT_URI"}}',
	};
	break;
case 'Webpack':
	CONFIG = {
		API_BASE: CONFIGURATION_API_BASE,
		AUTH_CLIENT_ID: CONFIGURATION_AUTH_CLIENT_ID,
		AUTH_URL: CONFIGURATION_AUTH_URL,
		REDIRECT_URI: CONFIGURATION_REDIRECT_URI,
	};
	break;
case 'Hardcoded':
default:
	CONFIG = {
		API_BASE: 'http://localhost:8000',
		AUTH_CLIENT_ID: 'fv-be',
		AUTH_URL: 'https://localhost:9000/auth',
		REDIRECT_URI: 'http://localhost:3000/',
	};
	break;
}

export {CONFIG};
