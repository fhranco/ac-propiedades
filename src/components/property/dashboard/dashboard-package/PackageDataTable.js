import React from "react";

const packageData = [
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
  {
    type: "Gratuito",
    propertiesRemaining: 3,
    featuredRemaining: 2,
    renewalRemaining: 7,
    storageSpace: "2 MB / 20 MB",
    expiryDate: "31 de diciembre, 2022",
  },
];

const PackageDataTable = () => {
  return (
    <table className="table-style3 table">
      <thead className="t-head">
        <tr>
          <th scope="col">Plan actual</th>
          <th scope="col">Propiedades restantes</th>
          <th scope="col">Destacados restantes</th>
          <th scope="col">Renovaciones restantes</th>
          <th scope="col">Espacio de almacenamiento</th>
          <th scope="col">Fecha de vencimiento</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {packageData.map((packageItem, index) => (
          <tr key={index}>
            <th scope="row">{packageItem.type}</th>
            <td>{packageItem.propertiesRemaining}</td>
            <td>{packageItem.featuredRemaining}</td>
            <td>{packageItem.renewalRemaining}</td>
            <td>{packageItem.storageSpace}</td>
            <td>{packageItem.expiryDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PackageDataTable;
