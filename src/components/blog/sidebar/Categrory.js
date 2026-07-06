import React from "react";

const Category = () => {
  const categories = ["Casas", "Departamentos", "Oficinas", "Cabañas", "Casas Adosadas"];

  return (
    <div className="sidebar-widget mb30">
      <h6 className="widget-title">Categorías</h6>
      <div className="category-list d-flex flex-column mt20">
        {categories.map((category, index) => (
          <a href="#" key={index}>
            {category}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Category;
