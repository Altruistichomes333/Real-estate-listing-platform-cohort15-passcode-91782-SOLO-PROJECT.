

// (1) Server Setup


const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





// (2) Property Model  

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  imageUrl: { type: String, required: true }
});

const Property = mongoose.model('Property', propertySchema);








// (3)Property API Endpoints


// Get all properties
app.get('/api/properties', async (req, res) => {
    try {
      const properties = await Property.find();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a specific property
  app.get('/api/properties/:id', async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Create a new property
  app.post('/api/properties', async (req, res) => {
    const property = new Property(req.body);
    try {
      const newProperty = await property.save();
      res.status(201).json(newProperty);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  







// Frontend  (React.js)

// (1) Property Search and Browse


  import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 0,
    bedrooms: 0,
    bathrooms: 0
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredProperties = properties.filter((property) => {
    const { location, minPrice, maxPrice, bedrooms, bathrooms } = filters;
    return (
      property.location.address.includes(location) &&
      property.price >= minPrice &&
      property.price <= maxPrice &&
      property.bedrooms >= bedrooms &&
      property.bathrooms >= bathrooms
    );
  });

  return (
    <div>
      <h1>Property Listings</h1>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        {/* Add more filter inputs */}
      </div>
      <div>
        {filteredProperties.map((property) => (
          <div key={property._id}>
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price: {property.price}</p>
            <p>Location: {property.location.address}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <button>Inquire</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;











// property inquiry form start here

import React, { useState } from 'react';
import axios from 'axios';

const PropertyInquiry = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/inquiries', {
        ...formData,
        propertyId
      });
      alert('Inquiry submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Error submitting inquiry. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        required
      ></textarea>
      <button type="submit">Submit Inquiry</button>
    </form>
  );
};

export default PropertyInquiry;
