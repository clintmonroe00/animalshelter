import axios from 'axios'


// Create an axios instance with a pre-configured base URL
const api = axios.create({
    baseURL: 'http://localhost:8000',
});

// Export the configured axios instance for use in other parts of the application
export default api;