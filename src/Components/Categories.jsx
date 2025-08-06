import React from 'react';

const Categories = ({ categories, onSelectCategory }) => {
  return (
    <div className="categories">
      {categories.map((cat, index) => (
        <button key={index} onClick={() => onSelectCategory(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Categories;
