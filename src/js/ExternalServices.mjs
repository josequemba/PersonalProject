const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json(); 

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse }; 
  }
}

export default class ExternalServices {
  async getData() {
    const response = await fetch(baseURL);
    const data = await convertToJson(response);
    //console.info(data)
    return data.recipes;
  }

  async findProductById(id) {
    this.getData("tents");

    const response = await fetch(baseURL + `product/${id}`);
    //console.log(response)
    const data = await convertToJson(response);
    //console.table(data)
    return data.Result;
  }

  async findProductByIds(ids) {
    const responseBackpacks = await fetch(baseURL + `products/search/backpacks`);
    const responseSleepingBags = await fetch(baseURL + `products/search/sleeping-bags`);
    const responseHammocks = await fetch(baseURL + `products/search/hammocks`);
    const responseTents = await fetch(baseURL + `products/search/tents`);
    //console.log(response)
    const data1 = await this.convertToJson2(responseBackpacks);
    const data2 = await this.convertToJson2(responseSleepingBags);
    const data3 = await this.convertToJson2(responseHammocks);
    const data4 = await this.convertToJson2(responseTents);

    const allData = data1.concat(data2, data3, data4); // Merge all data arrays

    const filteredData = allData.filter(element => ids.includes(element.Id));

    //console.log(filteredData);

    return filteredData;
  };

  async convertToJson2(response) {
      try {
          const data = await response.json();
          return data.Result; // Assuming data.Result is the array you want
      } catch (error) {
          console.error("Error converting response to JSON:", error);
          throw error; // Rethrow the error to handle it elsewhere if needed
      }
  }

  async checkout (formObject) {
    //const url = "https://wdd330-backend.onrender.com:3000/checkout";
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    };

    try {
        //const response = await fetch(url, options);
        //const data = await response.json();
        return fetch(baseURL + "checkout/", options).then(convertToJson);
    } catch (error) {
        console.error('Error during checkout:', error);
    }
  };

  async removeItemsFromServer(itemToRemove) {
    try {
      // Fetch the current data from the server
      const response = await fetch("/json/recipes.json");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Remove the specified item
      const newList = { "recipes": data.recipes.filter(element => element.id !== itemToRemove) };
  
      // Convert back to JSON string
      const jsonString = JSON.stringify(newList);

      // Set up the options for the POST request
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.jsonString
      };
  
      // Send the modified JSON to the server
      const postResponse = await fetch("/json/recipes.json", options);
      if (!postResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const postData = await postResponse.json();
  
    } catch (error) {
      console.error('Error during operation:', error);
    }
  }

}
