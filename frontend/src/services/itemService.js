import axios from 'axios';

const apiUrl = 'http://localhost:5031/api/item';

export const getItems = async () => {
    try {
        return await axios.get(apiUrl);
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

export const createItem = async (item) => {
    try {
        return await axios.post(apiUrl, item);
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

export const updateItem = async (id, item) => {
    try {
        return await axios.put(`${apiUrl}/${id}`, item);
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        return await axios.delete(`${apiUrl}/${id}`);
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};
