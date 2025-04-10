import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, IconButton, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Admin.css';
import url from './url';
const Admin = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [menuItems, setMenuItems] = useState([]); 
  const [newMenu, setNewMenu] = useState({ name: '', description: '' });
  const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '' });
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [editedItem, setEditedItem] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await axios.get(`${url}/getmenu`);
        setMenus(res.data.menus || []);
      } catch (err) {
        toast.error('Failed to fetch menus');
        console.error('Failed to fetch menus', err);
      }
    };

    fetchMenus();
  }, []);

  const handleAddMenu = async () => {
    try {
      const res = await axios.post(`${url}/createmenu`, {
        menuname: newMenu.name,
        description: newMenu.description,
      });

      setMenus([...menus, { ...res.data.menu, items: [] }]);
      setNewMenu({ name: '', description: '' });
      toast.success('Menu added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create menu');
      console.error('Error creating menu:', err);
    }
  };

  const handleMenuClick = async (index) => {
    setSelectedMenuIndex(index);

    const selectedMenu = menus[index];
    try {
      const res = await axios.get(`${url}/getmenuitem/${selectedMenu._id}`);
      setMenuItems(res.data.menuItems || []);
    } catch (err) {
      toast.error('Failed to fetch menu items');
      console.error('Failed to fetch menu items:', err);
      setMenuItems([]);
    }
  };

  const handleAddMenuItem = async () => {
    if (selectedMenuIndex === null) return;

    const selectedMenu = menus[selectedMenuIndex];
    try {
      const res = await axios.post(`${url}/createitem`, {
        menuId: selectedMenu._id,
        name: newMenuItem.name,
        description: newMenuItem.description,
        price: newMenuItem.price,
      });

      setMenuItems([...menuItems, res.data.menuItem]);
      setNewMenuItem({ name: '', description: '', price: '' });
      toast.success('Menu item added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add item');
      console.error('Error creating menu item:', err);
    }
  };

  const handleDeleteMenu = async (menuId, index) => {
    try {
      await axios.delete(`${url}/deletemenu/${menuId}`);
      const updatedMenus = [...menus];
      updatedMenus.splice(index, 1);
      setMenus(updatedMenus);
      setSelectedMenuIndex(null);
      setMenuItems([]);
      toast.success('Menu deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete menu');
      console.error('Error deleting menu:', err);
    }
  };

  const handleDeleteMenuItem = async (itemId, itemIndex) => {
    try {
      await axios.delete(`${url}/deletemenuitem/${itemId}`);
      const updatedMenuItems = [...menuItems];
      updatedMenuItems.splice(itemIndex, 1);
      setMenuItems(updatedMenuItems);
      toast.success('Menu item deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete menu item');
      console.error('Error deleting menu item:', err);
    }
  };

  const handleEditMenuItem = (index) => {
    setEditingItemIndex(index);
    setEditedItem(menuItems[index]); 
  };

  const handleSaveMenuItem = async () => {
    if (editingItemIndex === null) return;

    const menuItemToEdit = menuItems[editingItemIndex];
    try {
      const res = await axios.put(`${url}/editmenu/${menuItemToEdit._id}`, editedItem);

      const updatedMenuItems = [...menuItems];
      updatedMenuItems[editingItemIndex] = res.data.menuItem; 
      setMenuItems(updatedMenuItems);
      setEditingItemIndex(null);
      toast.success('Menu item saved successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save item');
      console.error('Error saving menu item:', err);
    }
  };

  return (
    <div className="admin-container">
      <ToastContainer />
      <Typography variant="h4" className="admin-title">
        MENU 
      </Typography>
      <Box className="admin-layout">
        <Box className="menu-sidebar">
          <Typography variant="h6" className="sidebar-title">
            Menus
          </Typography>
          <List className="menu-list">
            {menus.map((menu, index) => (
              <ListItem
                key={menu._id}
                selected={selectedMenuIndex === index}
                onClick={() => handleMenuClick(index)}
                className="menu-item"
              >
                <ListItemText primary={menu.name} />
                <IconButton
                  edge="end"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMenu(menu._id, index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Box className="add-menu-section">
            <TextField
              label="Menu Name"
              variant="outlined"
              size="small"
              value={newMenu.name}
              onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
            />
            <TextField
              label="Menu Description"
              variant="outlined"
              size="small"
              value={newMenu.description}
              onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
            />
            <Button variant="contained" onClick={handleAddMenu}>
              Add Menu
            </Button>
          </Box>
        </Box>

        {/* Right Section - Menu Items */}
        <Box className="menu-items-section">
          {selectedMenuIndex !== null && (
            <>
              <Typography variant="h6">
                Menu Items: {menus[selectedMenuIndex]?.name}
              </Typography>
              <Box className="menu-items-list">
                {menuItems.map((item, idx) => (
                  <Box key={item._id} className="menu-item-box">
                    {editingItemIndex === idx ? (
                      <>
                        <TextField
                          label="Item Name"
                          variant="outlined"
                          size="small"
                          value={editedItem.name}
                          onChange={(e) =>
                            setEditedItem({ ...editedItem, name: e.target.value })
                          }
                        />
                        <TextField
                          label="Description"
                          variant="outlined"
                          size="small"
                          value={editedItem.description}
                          onChange={(e) =>
                            setEditedItem({ ...editedItem, description: e.target.value })
                          }
                        />
                        <TextField
                          label="Price"
                          variant="outlined"
                          size="small"
                          type="number"
                          value={editedItem.price}
                          onChange={(e) =>
                            setEditedItem({ ...editedItem, price: e.target.value })
                          }
                        />
                        <IconButton onClick={handleSaveMenuItem}>
                          <SaveIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <span>{item.name} - ₹{item.price}</span>
                        <div>
                          <IconButton onClick={() => handleEditMenuItem(idx)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteMenuItem(item._id, idx)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </>
                    )}
                  </Box>
                ))}
              </Box>
              <Box className="add-item-section">
                <TextField
                  label="Item Name"
                  variant="outlined"
                  size="small"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                />
                <TextField
                  label="Item Description"
                  variant="outlined"
                  size="small"
                  value={newMenuItem.description}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={newMenuItem.price}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                />
                <Button variant="contained" onClick={handleAddMenuItem}>
                  Add Item
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Admin;