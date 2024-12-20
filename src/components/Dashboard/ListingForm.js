import React, { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase"; // Adjust the import path as needed
import { addDoc, collection } from "firebase/firestore";

const ListingForm = ({ onClose, refreshListings }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    contact: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        console.log(user.uid);
      } else {
        setUserId(null);
      }
    });  

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "listings"), {
        ...formData,
        ownerId: userId,
        createdAt: new Date()
      });
      console.log("Listing added successfully");
      refreshListings();
      onClose();
    } catch (error) {
      console.error("Error adding listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Contact"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Listing"}
      </button>
      <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </form>
  );
};

export default ListingForm;
