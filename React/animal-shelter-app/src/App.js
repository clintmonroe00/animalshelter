import React, {useState, useEffect} from 'react'
import api from './api'

// Main App component
const App = () => {
  // State to store a list of animal data
  const [animals, setAnimals] = useState([]);
  // State to manage form input data for adding a new animal
  const [formData, setFormData] = useState({
    animal_type: '',
    breed: '',
    color: '',
    date_of_birth: '',
    name: '',
    outcome_subtype: '',
    outcome_type: '',
    sex_upon_outcome: ''
  });

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
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    // Updates form data state with the new value for the changed field
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  // Handles form submission for adding a new animal record
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    
    // Format the date_of_birth field if it's provided
    const formattedData = {...formData};
    if (formData.date_of_birth) {
      const date = new Date(formData.date_of_birth);
      formattedData.date_of_birth = date.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
    }

    // Sends a POST request to add a new animal to the backend
    await api.post('/animals/', formData);
    fetchAnimals(); // Refreshes the animal list to include the new entry
    
    // Resets form data to empty values after submission
    setFormData({
      animal_type: '',
      breed: '',
      color: '',
      date_of_birth: '',
      name: '',
      outcome_subtype: '',
      outcome_type: '',
      sex_upon_outcome: ''
    });
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
        <form onSubmit={handleFormSubmit}>
          
          <div className='mb-3 mt-3'>
            <label htmlFor='animal_type' className='form-label'>
              Animal Type
            </label>
            <input  type='text' className='form-control' id='animal_type' name='animal_type' onChange={handleInputChange} value={formData.animal_type}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='breed' className='form-label'>
              Breed
            </label>
            <input  type='text' className='form-control' id='breed' name='breed' onChange={handleInputChange} value={formData.breed}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='color' className='form-label'>
              Color
            </label>
            <input  type='text' className='form-control' id='color' name='color' onChange={handleInputChange} value={formData.color}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='date_of_birth' className='form-label'>
              Date of Birth
            </label>
            <input  type='date' className='form-control' id='date_of_birth' name='date_of_birth' onChange={handleInputChange} value={formData.date_of_birth}/>
          </div>

            <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input  type='text' className='form-control' id='name' name='name' onChange={handleInputChange} value={formData.name}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='outcome_subtype' className='form-label'>
              Outcome Subtype
            </label>
            <input  type='text' className='form-control' id='outcome_subtype' name='outcome_subtype' onChange={handleInputChange} value={formData.outcome_subtype}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='outcome_type' className='form-label'>
              Outcome Type
            </label>
            <input  type='text' className='form-control' id='outcome_type' name='outcome_type' onChange={handleInputChange} value={formData.outcome_type}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='sex_upon_outcome' className='form-label'>
              Sex Upon Outcome
            </label>
            <input  type='text' className='form-control' id='sex_upon_outcome' name='sex_upon_outcome' onChange={handleInputChange} value={formData.sex_upon_outcome}/>
          </div>
        
          <div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
        <table className='table table-striped table-bordered table-hover mt-3 mb-3'>
          <thead>
            <tr>
              <th>Record Number</th>
              <th>Animal Type</th>
              <th>Breed</th>
              <th>Color</th>
              <th>Date of Birth</th>
              <th>Name</th>
              <th>Outcome Subtype</th>
              <th>Outcome Type</th>
              <th>Sex Upon Outcome</th>
              <th>Age Upon Outcome in Weeks</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.rec_num}</td>
                <td>{animal.animal_type}</td>
                <td>{animal.breed}</td>
                <td>{animal.color}</td>
                <td>{animal.date_of_birth}</td>
                <td>{animal.name}</td>
                <td>{animal.outcome_subtype}</td>
                <td>{animal.outcome_type}</td>
                <td>{animal.sex_upon_outcome}</td>
                <td>{animal.age_upon_outcome_in_weeks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App; // Exports App component as the default export
