import React from 'react';

const AnimalForm = ({ formData, onInputChange, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
        {Object.keys(formData).map((key) => (
          <div className='mb-3' key={key}>
            <label htmlFor={key} className='form-label'>
              {key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </label>
            <input
              type={key === 'date_of_birth' || key === 'date_of_outcome' ? 'date' : 'text'}
              className='form-control'
              id={key}
              name={key}
              onChange={onInputChange}
              value={formData[key]}
            />
          </div>
        ))}
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    );
};

export default AnimalForm;