import React from "react";

const Social = () => {
  const socialIcons = [
    { class: "fab fa-facebook-f", link: "https://www.facebook.com/acpropiedades" },
    { class: "fab fa-instagram", link: "https://www.instagram.com/acpropiedades" },
    { class: "fab fa-linkedin-in", link: "https://www.linkedin.com" }
  ];

  return (
    <div className="social-style1">
      {socialIcons.map((social, index) => (
        <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
          <i className={social.class + " list-inline-item"} />
        </a>
      ))}
    </div>
  );
};

export default Social;
