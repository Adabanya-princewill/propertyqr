import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addListing, editListing } from "../../redux/listingsSlice";

const ListingForm = ({ initialData = {}, onClose }) => {
  const dispatch = useDispatch();
  
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const userBrandName = loggedInUser?.brandName || ""; // Get brandName of the developer
  
  const [formData, setFormData] = useState({
    id: initialData.id || Date.now(),
    name: initialData.name || "",
    price: initialData.price || "",
    contact: initialData.contact || "",
    description: initialData.description || "",
    brandName: userBrandName, // Add brandName to formData
  });

  useEffect(() => {
    // Set the brandName in case it's updated
    setFormData((prevData) => ({
      ...prevData,
      brandName: userBrandName,
    }));
  }, [userBrandName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData.id) {
      dispatch(editListing(formData));
    } else {
      dispatch(addListing(formData));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Property Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        value={formData.contact}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">{initialData.id ? "Update" : "Add"} Listing</button>
    </form>
  );
};

export default ListingForm;
