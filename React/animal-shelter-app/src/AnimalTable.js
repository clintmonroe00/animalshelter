import React from 'react';

const AnimalTable = ({ animals }) => {
  return (
    <table className='table table-striped table-bordered table-hover mt-3 mb-3'>
      <thead>
        <tr>
          <th>Animal ID</th>
          <th>Age Upon Outcome</th>
          <th>Animal Type</th>
          <th>Breed</th>
          <th>Color</th>
          <th>Date of Birth</th>
          <th>Date of Outcome</th>
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
            <td>{animal.animal_id}</td>
            <td>{animal.age_upon_outcome}</td>
            <td>{animal.animal_type}</td>
            <td>{animal.breed}</td>
            <td>{animal.color}</td>
            <td>{animal.date_of_birth}</td>
            <td>{animal.date_of_outcome}</td>
            <td>{animal.name}</td>
            <td>{animal.outcome_subtype}</td>
            <td>{animal.outcome_type}</td>
            <td>{animal.sex_upon_outcome}</td>
            <td>{animal.age_upon_outcome_in_weeks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnimalTable;