import { getLocalStorage } from "./utils.mjs";

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
    const data2 = getLocalStorage("userRecipe");
    //console.info([...data.recipes, ...data2])
    //console.info(data2)
    if (data2 === null) {
      return data.recipes;
    } else {
      return [...data.recipes, ...data2];
    }
  }

  async findProductById(id) {
    this.getData("tents");

    const response = await fetch(baseURL + `product/${id}`);
    //console.log(response)
    const data = await convertToJson(response);
    //console.table(data)
    return data.Result;
  }

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
}
