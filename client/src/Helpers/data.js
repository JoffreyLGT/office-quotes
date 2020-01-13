import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const loadToken = () =>
  (axios.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("token"));

/**
 * Get all the quotes by sending a get request to the API.
 */
const getQuotes = async () => {
  try {
    const quotes = await axios.get(`${apiUrl}/quotes`);
    return quotes.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

/**
 * Get a specified quote by sending a get request to the API.
 * @param {string} id of the quote to get
 */
const getQuote = async id => {
  try {
    const quotes = await axios.get(`${apiUrl}/quotes/${id}`);
    return quotes.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

/**
 * Add a new quote by sending a post request to the API.
 * @param {*} quote to add
 */
const addQuote = async quote => {
  loadToken();
  try {
    const quotes = await axios.post(`${apiUrl}/quotes`, quote);
    return quotes.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

/**
 * Update a specified quote by sending a put request the API.
 * @param {string} id of the quote to update
 * @param {*} quote to set
 */
const updateQuote = async (id, quote) => {
  loadToken();
  try {
    const quotes = await axios.put(`${apiUrl}/quotes/${id}`, quote);
    return quotes.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

/**
 * Delete a specified quote be sending a delete request to the API.
 * @param {string} id of the quote to delete
 */
const deleteQuote = async id => {
  loadToken();
  try {
    const quotes = await axios.delete(`${apiUrl}/quotes/${id}`);
    return quotes.deletedCount === 1;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

/**
 * Login by sending a post request to the API to get the token.
 * @param {string} name
 * @param {string} password
 */
const login = async (name, password) => {
  try {
    const result = await axios.post(`${apiUrl}/users/login`, {
      name,
      password
    });
    return result.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

/**
 * Logout by sending a post request to the API to get the token.
 */
const logout = async () => {
  loadToken();
  let token = localStorage.getItem("token");
  try {
    const result = await axios.post(`${apiUrl}/users/me/logout`, {
      token
    });
    return result.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

/**
 * Get the user profile by sending a get request to the API.
 */
const getProfile = async () => {
  loadToken();
  try {
    const result = await axios.get(`${apiUrl}/users/me`);
    return result.data;
  } catch (error) {
    console.log(error);
    return { error: error, status: error.response.status };
  }
};

export {
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
  addQuote,
  login,
  logout,
  getProfile
};
