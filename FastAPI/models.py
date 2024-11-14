from database import Base
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import date

# Define a base class for all ORM models using SQLAlchemy's declarative system
Base = declarative_base()

# Define the Animal class, representing the 'animals' table in the database
class Animal(Base):
    __tablename__ = 'animals' # Set the table name in the database

    # Define columns for the 'animals' table
    rec_num = Column(Integer, primary_key=True, index=True) # Primary key column with indexing for faster lookups
    animal_type = Column(String)                            # Type of animal (e.g., dog, cat)
    breed = Column(String)                                  # Breed of the animal
    color = Column(String)                                  # Color of the animal
    date_of_birth = Column(Date)                            # Animal's date of birth
    name = Column(String)                                   # Name of the animal
    outcome_subtype = Column(String)                        # Additional details about the outcome
    outcome_type = Column(String)                           # Type of outcome (e.g., adoption, euthanasia)
    sex_upon_outcome = Column(String)                       # Sex of the animal at the outcome
    
    # Define a hybrid property to calculate the age in weeks based on the date of birth
    @hybrid_property
    def age_upon_outcome_in_weeks(self):
        # Calculate age in weeks if the date of birth is available
        if self.date_of_birth:
            today = date.today()
            delta = today - self.date_of_birth # Get the difference in days
            return delta.days // 7             # Convert days to weeks
        return None                            # Return None if the date of birth is not provided