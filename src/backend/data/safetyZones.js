// Manually curated safety zones for demo purposes
// safetyScore: 1-10 (1=most dangerous, 10=safest)
const safetyZones = [
  // Delhi
  { id: 1, name: 'Connaught Place', city: 'Delhi', lat: 28.6315, lng: 77.2167, radius: 600, safetyScore: 8, description: 'Well-lit commercial hub with heavy police presence.' },
  { id: 2, name: 'Chandni Chowk', city: 'Delhi', lat: 28.6506, lng: 77.2303, radius: 500, safetyScore: 5, description: 'Crowded market area. Stay alert for pickpockets.' },
  { id: 3, name: 'Paharganj', city: 'Delhi', lat: 28.6442, lng: 77.2127, radius: 400, safetyScore: 3, description: 'Tourist area but poorly lit at night. Avoid after dark.' },
  { id: 4, name: 'India Gate', city: 'Delhi', lat: 28.6129, lng: 77.2295, radius: 500, safetyScore: 9, description: 'Major landmark, well-patrolled and safe.' },
  { id: 5, name: 'Sarojini Nagar Market', city: 'Delhi', lat: 28.5747, lng: 77.1993, radius: 350, safetyScore: 6, description: 'Popular market. Crowded during weekends.' },

  // Mumbai
  { id: 6, name: 'Gateway of India', city: 'Mumbai', lat: 18.9220, lng: 72.8347, radius: 400, safetyScore: 9, description: 'Iconic landmark with strong security.' },
  { id: 7, name: 'Marine Drive', city: 'Mumbai', lat: 18.9432, lng: 72.8235, radius: 600, safetyScore: 8, description: 'Busy promenade, well-lit and safe.' },
  { id: 8, name: 'Dharavi', city: 'Mumbai', lat: 19.0438, lng: 72.8534, radius: 700, safetyScore: 3, description: 'Large slum area. Not recommended for solo travelers.' },
  { id: 9, name: 'Bandra', city: 'Mumbai', lat: 19.0596, lng: 72.8295, radius: 500, safetyScore: 7, description: 'Trendy suburb with nightlife. Use caution late at night.' },

  // Jaipur
  { id: 10, name: 'Hawa Mahal', city: 'Jaipur', lat: 26.9239, lng: 75.8267, radius: 400, safetyScore: 8, description: 'Popular tourist spot with good security.' },
  { id: 11, name: 'Amber Fort', city: 'Jaipur', lat: 26.9855, lng: 75.8513, radius: 500, safetyScore: 7, description: 'Well-visited heritage site.' },

  // Goa
  { id: 12, name: 'Calangute Beach', city: 'Goa', lat: 15.5449, lng: 73.7553, radius: 400, safetyScore: 7, description: 'Popular tourist beach. Watch belongings.' },
  { id: 13, name: 'Anjuna Beach', city: 'Goa', lat: 15.5735, lng: 73.7414, radius: 350, safetyScore: 5, description: 'Nightlife hub. Exercise caution after midnight.' },

  // International — Paris
  { id: 14, name: 'Eiffel Tower', city: 'Paris', lat: 48.8584, lng: 2.2945, radius: 500, safetyScore: 9, description: 'Major landmark with constant security.' },
  { id: 15, name: 'Montmartre', city: 'Paris', lat: 48.8867, lng: 2.3431, radius: 400, safetyScore: 6, description: 'Charming area but watch for scams.' },

  // International — Bangkok
  { id: 16, name: 'Khao San Road', city: 'Bangkok', lat: 13.7588, lng: 100.4974, radius: 300, safetyScore: 5, description: 'Backpacker hub. Beware of tourist scams.' },
  { id: 17, name: 'Grand Palace', city: 'Bangkok', lat: 13.7500, lng: 100.4913, radius: 400, safetyScore: 8, description: 'Well-guarded royal site.' },
];

export default safetyZones;
