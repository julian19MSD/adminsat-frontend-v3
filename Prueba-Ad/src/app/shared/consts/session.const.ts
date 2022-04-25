import {environment} from '../../../environments/environment';


export const JWT_CONFIG = {
  header: 'Authorization',
  authScheme: 'JWT',
  whitelistedDomains: [environment.serverUrl],
  blacklistedRoutes: [],
};



