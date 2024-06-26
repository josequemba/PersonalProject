// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  //localStorage.setItem(key, JSON.stringify(''));
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, newData) {
  try {
    // Get existing data from local storage
    let existingData = localStorage.getItem(key);

    // Parse existing data from JSON format
    existingData = existingData ? JSON.parse(existingData) : [];

    // If existingData is not an array, convert it into an array
    if (!Array.isArray(existingData)) {
      existingData = [existingData]; // Convert to array with existing data
    }

    // Append the new data to the existing data
    existingData.push(newData);

    // Save the updated data back to local storage
    localStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error in setLocalStorage:', error);
  }
}

export function setLocalSimpleStorage(key, newData) {
  try {
    // Convert data to a JSON string
    const jsonData = JSON.stringify(newData);
    // Set the item in localStorage
    localStorage.setItem(key, jsonData);
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error in setLocalSimpleStorage:', error);
  }
}

//function to hide elements, id = html class to hide
export function hideElement(htmlClass){
  document.querySelector(htmlClass).classList.add("hide");
}

//function to show elements, id = html class to hide
export function showElement(htmlClass){
  document.querySelector(htmlClass).classList.add("show");
}

export function renderListWithTemplate(templateFn, parentElement, 
  list, position = "afterbegin", clear = false) {
  
  const listItem = list.map(templateFn);
  
  if (clear) {
    parentElement.innerHTML = "";
  }
  
  parentElement.insertAdjacentHTML(position, listItem.join(""));
}

//activity03

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if(callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const pathresponse = await fetch(path);
  const template = await pathresponse.text();
  return template;
}

export async function loadHeaderFooter() {
  // Get header and footer elements from the DOM
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.getElementById("main-header");

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.getElementById("main-footer");
  // Render header and footer with templates
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to remove an alert by index
export function removeAlertByIndex(index) {
  var alertContainer = document.getElementById('alert-container');
  var alerts = alertContainer.getElementsByClassName('alert');
  
  if (index >= 0 && index < alerts.length) {
      removeAlertByElement(alerts[index]);
  } else {
      console.error('Invalid index');
  }
}

// Function to remove an alert by its DOM element
function removeAlertByElement(alertElement) {
  alertElement.remove();
}

export function removeItemsFromLocalStorage(key, itemToRemove) {
  // Step 1: Retrieve the array from local storage
  let storedArray = JSON.parse(localStorage.getItem(key)) || [];
  
  // Step 2: Filter out all instances of the item to remove
  let filteredArray = storedArray.filter(item => item !== itemToRemove);
  
  // Step 3: Save the updated array back to local storage
  localStorage.setItem(key, JSON.stringify(filteredArray));
  
}