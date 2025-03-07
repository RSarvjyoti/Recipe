import React, { useState } from "react";
import axios from "axios";
import { BiDish, BiBookContent } from "react-icons/bi";
import { MdFoodBank, MdOutlineCategory } from "react-icons/md";
import { FaFireAlt } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";

const MyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    calories: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post(
        "https://recipe-zgb7.onrender.com/api/recipe/create",
        formData
      );
      setSuccess("Recipe added successfully!");
      setFormData({ title: "", description: "", category: "", calories: "", image: "" });
    } catch (err) {
      setError("Failed to add recipe. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>
          <MdFoodBank style={loading ? {...styles.headerIcon, ...styles.iconDisabled} : styles.headerIcon} /> 
          Add a Recipe
        </h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <BiDish style={loading ? {...styles.icon, ...styles.iconDisabled} : styles.icon} /> 
            Recipe Title
          </label>
          <input
            style={styles.input}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <BiBookContent style={loading ? {...styles.icon, ...styles.iconDisabled} : styles.icon} /> 
            Description
          </label>
          <textarea
            style={styles.textarea}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <AiOutlineCloudUpload style={loading ? {...styles.icon, ...styles.iconDisabled} : styles.icon} /> 
            Add Image URL
          </label>
          <input
            style={styles.input}
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <MdOutlineCategory style={loading ? {...styles.icon, ...styles.iconDisabled} : styles.icon} /> 
            Choose Category
          </label>
          <select
            style={styles.select}
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Choose category</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <FaFireAlt style={loading ? {...styles.icon, ...styles.iconDisabled} : styles.icon} /> 
            Add Calories
          </label>
          <input
            style={styles.input}
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button} 
          type="submit" 
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Recipe"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    marginBottom: '2rem',
    fontSize: '2rem',
    fontWeight: '600',
  },
  headerIcon: {
    fontSize: '2.5rem',
    marginRight: '10px',
    color: '#007bff',
    transition: 'color 0.2s ease',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
    color: '#444',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  icon: {
    marginRight: '8px',
    fontSize: '1.2rem',
    color: '#007bff',
    transition: 'color 0.2s ease',
  },
  iconDisabled: {
    color: '#cccccc',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#007bff',
      boxShadow: '0 0 0 2px rgba(0,123,255,0.25)',
    }
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minHeight: '120px',
    resize: 'vertical',
    transition: 'all 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#007bff',
      boxShadow: '0 0 0 2px rgba(0,123,255,0.25)',
    }
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    '&:focus': {
      borderColor: '#007bff',
      boxShadow: '0 0 0 2px rgba(0,123,255,0.25)',
    }
  },
  button: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#0056b3',
    }
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: '#cccccc',
    }
  },
  error: {
    color: '#dc3545',
    backgroundColor: '#ffe6e6',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  success: {
    color: '#28a745',
    backgroundColor: '#e8f5e9',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};

export default MyForm;