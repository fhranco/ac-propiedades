"use client";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const listingData = [
  {
    id: 1,
    title: "Equestrian Family Home",
    date: "31 de diciembre, 2022",
  },
  {
    id: 2,
    title: "Luxury villa in Rego Park",
    date: "31 de diciembre, 2022",
  },
  {
    id: 3,
    title: "Villa on Hollywood Boulevard",
    date: "31 de diciembre, 2022",
  },
  {
    id: 4,
    title: "Triple Story House for Rent",
    date: "31 de diciembre, 2022",
  },
  {
    id: 5,
    title: "Northwest Office Space",
    date: "31 de diciembre, 2022",
  },
  {
    id: 6,
    title: "House on the beverly hills",
    date: "31 de diciembre, 2022",
  },
  {
    id: 7,
    title: "Luxury villa called Elvado",
    date: "31 de diciembre, 2022",
  },
  {
    id: 8,
    title: "House on the Northridge",
    date: "31 de diciembre, 2022",
  },
  {
    id: 9,
    title: "Equestrian Family Home",
    date: "31 de diciembre, 2022",
  },
  {
    id: 10,
    title: "Luxury villa in Rego Park",
    date: "31 de diciembre, 2022",
  },
  {
    id: 11,
    title: "Villa on Hollywood Boulevard",
    date: "31 de diciembre, 2022",
  },
];

const SearchDataTable = () => {
  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Título</th>
          <th scope="col">Fecha de creación</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {listingData.map((listing, index) => (
          <tr key={index}>
            <th scope="row">{listing.title}</th>
            <td>{listing.date}</td>
            <td>
              <div className="d-flex">
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`full_screen-${listing.id}`}
                >
                  <span className="flaticon-fullscreen-1" />
                </button>
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`edit-${listing.id}`}
                >
                  <span className="fas fa-pen fa" />
                </button>
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${listing.id}`}
                >
                  <span className="flaticon-bin" />
                </button>

                <ReactTooltip
                  id={`full_screen-${listing.id}`}
                  place="top"
                  content="Ver"
                />
                <ReactTooltip
                  id={`edit-${listing.id}`}
                  place="top"
                  content="Editar"
                />
                <ReactTooltip
                  id={`delete-${listing.id}`}
                  place="top"
                  content="Eliminar"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchDataTable;
