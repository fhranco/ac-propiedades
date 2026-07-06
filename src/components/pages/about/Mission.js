const Mission = () => {
  const missionData = [
    {
      icon: "flaticon-discovery",
      title: "Conocimiento Local",
      description: "Conocemos la tierra y el mercado de Magallanes mejor que nadie.",
    },
    {
      icon: "flaticon-secure-payment",
      title: "Transparencia Total",
      description: "Te asesoramos con la verdad por delante para inversiones sólidas.",
    },
  ];

  return (
    <>
      {missionData.map((item, index) => (
        <div className="col-sm-6" key={index}>
          <div className="why-chose-list style3">
            <div className="list-one mb30">
              <span className={`list-icon flex-shrink-0 ${item.icon} mb20`} />
              <div className="list-content flex-grow-1">
                <h6 className="mb-1">{item.title}</h6>
                <p className="text mb-0 fz14">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Mission;
