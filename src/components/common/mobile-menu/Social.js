const Social = () => {
  const socialLinks = [
    {
      id: 1,
      iconClass: "fab fa-facebook-f",
      href: "https://www.facebook.com/Propiedadespuq",
    },
    {
      id: 3,
      iconClass: "fab fa-instagram",
      href: "https://www.instagram.com/acpropiedadesmagallanes/",
    },
  ];

  return (
    <>
      {socialLinks.map((link) => (
        <a className="me-3" href={link.href} key={link.id}>
          <i className={link.iconClass}></i>
        </a>
      ))}
    </>
  );
};

export default Social;
