import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiDish } from "react-icons/bi";
import { MdCategory, MdLocalFireDepartment } from "react-icons/md";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";

const ShowAllItems = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const readData = async () => {
    try {
      const res = await axios.get(
        `https://recipe-zgb7.onrender.com/api/recipe/read?sort=${sortField}&direction=${sortDirection}`
      );
      setData(res.data.recipes);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`https://recipe-zgb7.onrender.com/api/recipe/delete/${recipeId}`);
      readData();
      setSelectedRecipe(null);
      alert("Recipe deleted successfully!");
    } catch (err) {
      console.error("Failed to delete recipe:", err);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  const handleUpdateRecipe = async (recipeId, updatedData) => {
    try {
      await axios.put(
        `https://recipe-zgb7.onrender.com/api/recipe/update/${recipeId}`,
        updatedData
      );
      readData();
      setSelectedRecipe(null);
      setIsEditing(false);
      setEditFormData(null);
      alert("Recipe updated successfully!");
    } catch (err) {
      console.error("Failed to update recipe:", err);
      alert("Failed to update recipe. Please try again.");
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    handleUpdateRecipe(selectedRecipe._id, editFormData);
  };

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setIsEditing(false);
    setEditFormData(null);
    document.body.style.overflow = 'unset';
  };

  const handleSort = (field) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleSurpriseMe = () => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setSelectedRecipe(data[randomIndex]);
    }
  };

  useEffect(() => {
    readData();
  }, [sortField, sortDirection]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const RecipeCard = ({ recipe }) => (
    <div style={styles.recipeCard} onClick={() => handleCardClick(recipe)}>
      <div style={styles.imageContainer}>
        <img src={recipe.image} alt={recipe.title} style={styles.cardImg} />
      </div>
      <div style={styles.cardBody}>
        <div style={styles.titleContainer}>
          <BiDish style={styles.titleIcon} />
          <h3 style={styles.title}>{recipe.title}</h3>
        </div>
        <p style={styles.desc}>{recipe.dec}</p>
        <div style={styles.infoContainer}>
          <div style={styles.infoItem}>
            <MdCategory style={styles.categoryIcon} />
            <span style={styles.label}>Category:</span>
            <span style={styles.value}>{recipe.category}</span>
          </div>
          <div style={styles.infoItem}>
            <MdLocalFireDepartment style={styles.caloriesIcon} />
            <span style={styles.label}>Calories:</span>
            <span style={styles.value}>{recipe.calories}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <div style={styles.skeletonCard}>
      <div style={styles.skeletonImage}></div>
      <div style={styles.skeletonBody}>
        <div style={styles.skeletonTitle}></div>
        <div style={styles.skeletonText}></div>
        <div style={styles.skeletonText}></div>
        <div style={styles.skeletonInfo}>
          <div style={styles.skeletonInfoItem}></div>
          <div style={styles.skeletonInfoItem}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.sortingControls}>
        <button style={styles.button} onClick={() => handleSort('title')}>
          Sort by Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button style={styles.button} onClick={() => handleSort('calories')}>
          Sort by Calories {sortField === 'calories' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          style={{
            ...styles.button,
            backgroundColor: '#ff6b6b',
            color: '#fff',
            border: 'none',
          }} 
          onClick={handleSurpriseMe}
        >
          Surprise Me! 🎲
        </button>
      </div>

      {loading && (
        <div style={styles.recipeContainer}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SkeletonCard key={item} />
          ))}
        </div>
      )}
      
      {error && (
        <p style={{ ...styles.message, color: "#e74c3c" }}>
          Failed to load recipes! ❌
        </p>
      )}
      
      {!loading && !error && (
        <div style={styles.recipeContainer}>
          {currentItems.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}

      <div style={styles.pagination}>
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === index + 1 ? '#007bff' : '#fff',
              color: currentPage === index + 1 ? '#fff' : '#007bff',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {selectedRecipe && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeModal}>
              <AiOutlineClose />
            </button>

            {!isEditing ? (
              <>
                <img src={selectedRecipe.image} alt={selectedRecipe.title} style={styles.modalImage} />
                <h2>{selectedRecipe.title}</h2>
                <p>{selectedRecipe.dec}</p>
                <div style={styles.modalInfo}>
                  <p><strong>Category:</strong> {selectedRecipe.category}</p>
                  <p><strong>Calories:</strong> {selectedRecipe.calories}</p>
                </div>
                <div style={styles.modalActions}>
                  <button 
                    style={styles.deleteButton}
                    onClick={() => handleDeleteRecipe(selectedRecipe._id)}
                  >
                    Delete Recipe
                  </button>
                  <button 
                    style={styles.editButton}
                    onClick={() => {
                      setIsEditing(true);
                      setEditFormData(selectedRecipe);
                    }}
                  >
                    Edit Recipe
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmitEdit} style={styles.editForm}>
                <div style={styles.formGroup}>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Description:</label>
                  <textarea
                    name="dec"
                    value={editFormData.dec}
                    onChange={handleEditInputChange}
                    style={styles.textarea}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="image"
                    value={editFormData.image}
                    onChange={handleEditInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Calories:</label>
                  <input
                    type="number"
                    name="calories"
                    value={editFormData.calories}
                    onChange={handleEditInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formActions}>
                  <button type="submit" style={styles.saveButton}>
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    style={styles.cancelButton}
                    onClick={() => {
                      setIsEditing(false);
                      setEditFormData(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sortingControls: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
  },
  recipeContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  dragging: {
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
  },
  dragHandle: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px',
    cursor: 'grab',
    color: '#fff',
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
  },
  imageContainer: {
    height: '200px',
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '15px',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  titleIcon: {
    marginRight: '8px',
    fontSize: '20px',
    color: '#007bff',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    color: '#333',
  },
  desc: {
    margin: '0 0 15px 0',
    color: '#666',
    fontSize: '14px',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
  },
  label: {
    color: '#666',
  },
  value: {
    color: '#333',
    fontWeight: 'bold',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  pageButton: {
    padding: '8px 12px',
    border: '1px solid #007bff',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  modalActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  textarea: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    minHeight: '100px',
    resize: 'vertical',
  },
  formActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  saveButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  modalInfo: {
    margin: '15px 0',
  },
  skeletonCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  skeletonImage: {
    height: '200px',
    backgroundColor: '#f0f0f0',
  },
  skeletonBody: {
    padding: '15px',
  },
  skeletonTitle: {
    height: '24px',
    backgroundColor: '#f0f0f0',
    marginBottom: '10px',
    borderRadius: '4px',
  },
  skeletonText: {
    height: '16px',
    backgroundColor: '#f0f0f0',
    marginBottom: '8px',
    borderRadius: '4px',
  },
  skeletonInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  skeletonInfoItem: {
    width: '80px',
    height: '16px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '20px',
  },
  sortingControls: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#495057',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    '&:hover': {
      opacity: 0.9,
      transform: 'scale(1.02)',
    },
  },
}

export default ShowAllItems;