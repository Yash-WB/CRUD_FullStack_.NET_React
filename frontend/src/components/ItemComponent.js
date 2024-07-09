import React, { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem } from '../services/itemService';
import './ItemComponent.css';

const ItemComponent = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [editMode, setEditMode] = useState(false);
    const [editItemId, setEditItemId] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await getItems();
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await updateItem(editItemId, { ...newItem, id: editItemId });
                setEditMode(false);
                setEditItemId(null);
            } else {
                await createItem(newItem);
            }
            setNewItem({ name: '', description: '' });
            fetchItems();
        } catch (error) {
            console.error('Error submitting item:', error);
        }
    };

    const handleEdit = (item) => {
        setNewItem({ name: item.name, description: item.description });
        setEditMode(true);
        setEditItemId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="item-component">
            <h1>Items</h1>
            <form onSubmit={handleSubmit} className="item-form">
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="item-input"
                />
                <input
                    type="text"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    className="item-input"
                />
                <button type="submit" className="item-button">{editMode ? 'Update Item' : 'Add Item'}</button>
            </form>
            <table className="item-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleEdit(item)} className="item-button">Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="item-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemComponent;
