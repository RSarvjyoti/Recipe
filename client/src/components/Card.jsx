import React from "react";
import { MdCategory, MdLocalFireDepartment } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";

const styles = {
  card: {
    width: "300px",
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
    textAlign: "left",
    transition: "all 0.3s ease",
    margin: "15px",
    border: "1px solid #eee",
    '&:hover': {
      transform: "translateY(-5px)",
      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
    }
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    '&:hover': {
      transform: "scale(1.05)",
    }
  },
  content: {
    padding: "20px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  titleIcon: {
    color: "#3498db",
    fontSize: "24px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#2c3e50",
    margin: "0",
    lineHeight: "1.3",
    flex: 1,
  },
  desc: {
    fontSize: "15px",
    color: "#666",
    marginBottom: "15px",
    lineHeight: "1.5",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
    paddingTop: "15px",
    borderTop: "1px solid #eee",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  category: {
    fontSize: "14px",
    color: "#2ecc71",
    fontWeight: "500",
  },
  calories: {
    fontSize: "14px",
    color: "#e74c3c",
    fontWeight: "500",
  },
  icon: {
    fontSize: "16px",
    verticalAlign: "middle",
  },
  categoryIcon: {
    color: "#2ecc71",
  },
  caloriesIcon: {
    color: "#e74c3c",
  },
  label: {
    color: "#7f8c8d",
    fontWeight: "600",
    marginRight: "4px",
  }
};

const Card = ({ title, dec, image, calories, category }) => {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <div style={styles.content}>
        <div style={styles.titleContainer}>
          <BiDish style={styles.titleIcon} />
          <h3 style={styles.title}>{title}</h3>
        </div>
        <p style={styles.desc}>{dec}</p>
        <div style={styles.infoContainer}>
          <div style={styles.infoItem}>
            <MdCategory style={{...styles.icon, ...styles.categoryIcon}} />
            <span style={styles.label}>Category:</span>
            <span style={styles.category}>{category}</span>
          </div>
          <div style={styles.infoItem}>
            <MdLocalFireDepartment style={{...styles.icon, ...styles.caloriesIcon}} />
            <span style={styles.label}>Calories:</span>
            <span style={styles.calories}>{calories} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;