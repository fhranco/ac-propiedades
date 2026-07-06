import React from "react";

const PopularTags = () => {
  const tags = ["En Venta", "Casas", "Agentes", "Departamentos", "Cabañas"];

  return (
    <div className="sidebar-widget mb30 pb20">
      <h6 className="widget-title">Etiquetas Populares</h6>
      <div className="tag-list mt20">
        {tags.map((tag, index) => (
          <a href="#" key={index}>
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
