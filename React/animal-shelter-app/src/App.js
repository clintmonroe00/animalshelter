import React, {useState, useEffect} from 'react'
import api from './api'
import AnimalForm from './AnimalForm';
import AnimalTable from './AnimalTable';

// Main App component
const App = () => {
  // State to store a list of animal data
  const [animals, setAnimals] = useState([]);
  // State to manage form input data for adding a new animal
  const initialFormData = {
    animal_id: '',
    animal_type: '',
    breed: '',
    color: '',
    date_of_birth: '',
    date_of_outcome: '',
    name: '',
    outcome_subtype: '',
    outcome_type: '',
    sex_upon_outcome: '',
    location_lat: '',
    location_long: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  

  // Fetches animal data from the backend API
  const fetchAnimals = async () => {
    const response = await api.get('/animals/');
    setAnimals(response.data) // Updates the animal state with fetched data
  };

  // useEffect to fetch animals when the component mounts
  useEffect(() => {
    fetchAnimals();
  }, []);

  // Handles changes in the form inputs
  const handleInputChange = (event) => {
    // Checks if the input is a checkbox; otherwise, uses the input's value
    const { name, value } = event.target;
    // Updates form data state with the new value for the changed field
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Utility function to format dates
  const formatDateFields = (data, fields) => {
    const formattedData = { ...data };
    fields.forEach((field) => {
      if (data[field]) {
        const date = new Date(data[field]);
        formattedData[field] = date.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
      }
    });
    return formattedData;
  };

  // Handles form submission for adding a new animal record
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    
    // Format necessary date fields
    const formattedData = formatDateFields(formData, ['date_of_birth', 'date_of_outcome']);

    // Sends a POST request to add a new animal to the backend
    await api.post('/animals/', formattedData);
    
    // Refreshes the animal list to include the new entry
    fetchAnimals(); 

    // Resets form data to empty values after submission
    setFormData(initialFormData);
  };

  // JSX return for rendering the application UI
  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href="#">
            Animal Shelter App
          </a>
        </div>
      </nav>
      
      <div className='container'>
        <AnimalForm formData={formData} onInputChange={handleInputChange} onSubmit={handleFormSubmit} />
        <AnimalTable animals={animals} />
      </div>
    </div>
  );
};

export default App; // Exports App component as the default export
