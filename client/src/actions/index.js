import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
    // We'll put proxy settings to client\package.json
    // in order to this relative path get work properly in development envirenment
    // On production to heroku no need proxy, it'll work properly
    axios.get('/api/current_user');
};
