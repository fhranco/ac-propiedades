import React from "react";

const ContactInfo = () => {
  const contactInfo = [
    {
      id: 1,
      title: "WhatsApp",
      phone: "+56 9 8415 2100",
      phoneHref: "https://wa.me/56984152100",
    },
  ];

  return (
    <>
      {contactInfo.map((info) => (
        <div className="col-auto" key={info.id}>
          <div className="contact-info">
            <p className="info-title dark-color">{info.title}</p>
            <h6 className="info-phone dark-color">
              <a href={info.phoneHref} target="_blank" rel="noopener noreferrer">
                {info.phone}
              </a>
            </h6>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
