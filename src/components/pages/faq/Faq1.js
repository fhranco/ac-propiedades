const Faq1 = () => {
  const faqItems = [
    {
      id: "buyQ1",
      question: "¿Qué es la Promesa de Compraventa y por qué es importante?",
      answer:
        "La Promesa de Compraventa es un contrato firmado en notaría donde el comprador se compromete a comprar y el vendedor a vender, bajo ciertas condiciones (como que los títulos estén ajustados a derecho) y en un plazo determinado. Es crucial porque 'congela' la propiedad a tu favor y establece multas en caso de que alguna de las partes se arrepienta sin justificación legal.",
    },
    {
      id: "buyQ2",
      question: "¿Qué es un Estudio de Títulos y por qué lo necesito?",
      answer:
        "Es una revisión legal (generalmente de los últimos 10 años) que hace un abogado para asegurarse de que la propiedad no tenga embargos, hipotecas ocultas, herencias sin resolver o prohibiciones de venta. En Chile, esto es indispensable para garantizar que compras un inmueble sin problemas legales futuros.",
    },
    {
      id: "buyQ3",
      question: "¿Qué son los gastos operacionales en un crédito hipotecario?",
      answer:
        "Al comprar con financiamiento bancario, el banco te cobrará ciertos gastos para cursar el crédito. Estos incluyen: Tasación del inmueble, Estudio de Títulos por parte del abogado del banco, gastos de Notaría (escritura), Conservador de Bienes Raíces (CBR) e Impuesto al Mutuo. Debes tener este dinero ahorrado aparte del pie.",
    },
    {
      id: "buyQ4",
      question: "¿Puedo comprar una parcela o propiedad en Magallanes si soy extranjero?",
      answer:
        "Sí, cualquier extranjero con RUT chileno (incluso provisorio para inversionistas) puede comprar propiedades. Sin embargo, en la Región de Magallanes, debido a su carácter de zona fronteriza, existen restricciones legales específicas para adquirir tierras rurales cerca de las fronteras sin autorización del Estado.",
    },
    {
      id: "buyQ5",
      question: "¿Qué significa comprar una propiedad 'en verde' o 'en blanco'?",
      answer:
        "Comprar 'en blanco' significa que el proyecto solo tiene permisos, pero no ha iniciado construcción. 'En verde' significa que ya está en construcción pero no está terminado. En ambos casos suele ser más barato, pero debes asegurarte de que la inmobiliaria entregue una póliza de garantía por los dineros anticipados, tal como exige la ley chilena.",
    },
    {
      id: "buyQ6",
      question: "¿Cuándo soy legalmente el dueño de la propiedad?",
      answer:
        "En Chile, NO eres dueño cuando firmas la escritura pública en la notaría ni cuando entregas el dinero. Legalmente te conviertes en el propietario exclusivo en el momento en que la escritura se inscribe a tu nombre en el Registro de Propiedad del Conservador de Bienes Raíces (CBR) respectivo (ej. CBR de Punta Arenas).",
    },
    {
      id: "buyQ7",
      question: "¿Cómo sé si una propiedad tiene deudas de contribuciones o servicios?",
      answer:
        "Las contribuciones se verifican solicitando un 'Certificado de Deuda de Bienes Raíces' en el portal del Servicio de Impuestos Internos (SII) con el Rol de la propiedad. El aseo domiciliario se consulta en la Municipalidad correspondiente, y las cuentas de servicios (luz, gas, agua) pidiendo los comprobantes al día al vendedor.",
    },
    {
      id: "buyQ8",
      question: "¿Qué es el DFL-2 y qué beneficios me otorga al comprar?",
      answer:
        "El DFL-2 (Decreto con Fuerza de Ley N°2) aplica a viviendas cuya superficie edificada no supere los 140 m². Otorga beneficios tributarios como: rebaja del 50% en el arancel del Conservador, reducción de contribuciones territoriales (por un periodo de años dependiendo del metraje) y exención de impuestos a las rentas en caso de que decidas arrendarla.",
    },
    {
      id: "buyQ9",
      question: "¿Puedo comprar usando subsidios del MINVU (ej. DS1 o DS19)?",
      answer:
        "Sí, es posible usar subsidios habitacionales del Estado para comprar propiedades usadas o nuevas, pero la propiedad debe cumplir con estrictos requisitos técnicos (recepción final al día, tasación acorde a los límites del subsidio) y el vendedor debe estar dispuesto a aceptar los plazos de pago que el Estado demora en liberar los fondos.",
    },
    {
      id: "buyQ10",
      question: "¿Necesito obligatoriamente un abogado para comprar?",
      answer:
        "Si compras al contado, la ley no exige un abogado, pero es **altamente riesgoso** no tener uno para hacer el estudio de títulos y redactar la escritura. Si compras con crédito, el banco pondrá a sus abogados. Al trabajar con AC Propiedades, nuestra asesoría legal está integrada para proteger tus intereses en todo momento.",
    },
  ];

  return (
    <div className="accordion" id="accordionBuyers">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseBuy${index}`}
              aria-expanded={index === 0 ? "true" : "false"}
              aria-controls={`collapseBuy${index}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapseBuy${index}`}
            className={`accordion-collapse collapse ${
              index === 0 ? "show" : ""
            }`}
            aria-labelledby={item.id}
            data-parent="#accordionBuyers"
          >
            <div className="accordion-body">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq1;
