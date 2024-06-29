
// Sample property data
const properties = [
    { id: 1, location: 'New York, NY', price: 500000, bedrooms: 2, bathrooms: 1 },
    { id: 2, location: 'Los Angeles, CA', price: 750000, bedrooms: 3, bathrooms: 2 },
    { id: 3, location: 'Chicago, IL', price: 300000, bedrooms: 1, bathrooms: 1 },
    { id: 4, location: 'Miami, FL', price: 400000, bedrooms: 2, bathrooms: 1 },
  ];
  
  // Get DOM elements
  const searchForm = document.getElementById('search-form');
  const propertyList = document.getElementById('property-list');
  
  // Render property cards
  function renderPropertyCards() {
    propertyList.innerHTML = '';
  
    properties.forEach(property => {
      const card = document.createElement('div');
      card.classList.add('property-card');
      card.innerHTML = `
        <h3>${property.location}</h3>
        <p>Price: $${property.price}</p>
        <p>Bedrooms: ${property.bedrooms}</p>
        <p>Bathrooms: ${property.bathrooms}</p>
        <button>Inquire</button>
      `;
      propertyList.appendChild(card);
    });
  }
  
  // Handle search form submission
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
  
    const location = document.getElementById('location-input').value;
    const minPrice = document.getElementById('min-price-input').value;
    const maxPrice = document.getElementById('max-price-input').value;
  
    // Filter properties based on search criteria
    const filteredProperties = properties.filter(property => {
      return (
        property.location.toLowerCase().includes(location.toLowerCase()) &&
        property.price >= parseInt(minPrice) &&
        property.price <= parseInt(maxPrice)
      );
    });
  
    // Render the filtered property cards
    renderPropertyCards(filteredProperties);
  });
  
  // Initial render of property cards
  renderPropertyCards();
  