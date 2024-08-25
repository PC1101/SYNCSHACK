// Function to fetch and process the JSON file
async function processJsonFile(url) {
    try {
      // Fetch the JSON file
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON data
      const jsonData = await response.json();
  
      // Extract necessary details
      const mapDetails = jsonData.map(item => {
        return {
          id: item.id, // Assuming each item has an 'id'
          latitude: item.latitude, // Assuming each item has a 'latitude'
          longitude: item.longitude, // Assuming each item has a 'longitude'
          title: item.title // Assuming each item has a 'name'
        };
      });
  
      return mapDetails;
    } catch (error) {
      console.error('Error fetching or processing JSON file:', error);
    }
  }
  
  // Usage example
  const url = '/Users/chenshihchi1/Desktop/SYNCSHACK/output.json'; // URL to your JSON file
  processJsonFile(url).then(details => console.log(details));
  