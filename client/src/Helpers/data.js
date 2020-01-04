import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

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
  try {
    const quotes = await axios.delete(`${apiUrl}/quotes/${id}`);
    return quotes.deletedCount === 1;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export { getQuotes, getQuote, updateQuote, deleteQuote, addQuote };
