import React from "react";

const ContactMeta = () => {
  const contactInfoList = [
    {
      title: "Atención al Cliente",
      phone: "+56 9 8415 2100",
      phoneLink: "tel:+56984152100",
    },
    {
      title: "Soporte por Correo",
      mail: "contacto@acpropiedadesmagallanes.cl",
      mailLink: "mailto:contacto@acpropiedadesmagallanes.cl",
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5 justify-content-center justify-content-md-start text-center text-md-start">
      {contactInfoList.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info">
            <p className="info-title" style={{ color: "rgba(255, 255, 255, 0.7)" }}>{contact.title}</p>
            {contact.phone && (
              <h6 className="info-phone">
                <a href={contact.phoneLink} style={{ color: "#ffffff" }}>{contact.phone}</a>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-mail">
                <a href={contact.mailLink} style={{ color: "#ffffff" }}>{contact.mail}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;
