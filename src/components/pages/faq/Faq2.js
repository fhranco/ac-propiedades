const Faq2 = () => {
  const faqItems = [
    {
      id: "sellQ1",
      question: "¿Qué documentos indispensables necesito para vender mi propiedad?",
      answer:
        "Para iniciar, necesitarás: Copia de la Escritura de compraventa, Certificado de Dominio Vigente, Certificado de Hipotecas y Gravámenes, Certificado de Deuda de Contribuciones (SII), Certificado de No Expropiación (Municipal y Serviu), y si es casa, el Certificado de Recepción Final. Nosotros te ayudamos a recopilarlos todos.",
    },
    {
      id: "sellQ2",
      question: "¿Debo pagar impuestos por la ganancia obtenida al vender mi casa?",
      answer:
        "En Chile, existe una exención de hasta 8.000 UF (aprox. 300 millones de pesos) de ganancia de capital durante toda la vida del contribuyente, siempre que no te dediques habitualmente a la compraventa de inmuebles. Si la utilidad de tu venta está bajo ese límite, no pagas Impuesto a la Renta por ella.",
    },
    {
      id: "sellQ3",
      question: "¿Quién paga los gastos de Notaría y del Conservador?",
      answer:
        "La costumbre en Chile es que los gastos de la Escritura Pública en Notaría se dividen en partes iguales (50/50) entre el vendedor y el comprador. Por otro lado, los gastos de inscripción en el Conservador de Bienes Raíces (CBR) son responsabilidad exclusiva del comprador.",
    },
    {
      id: "sellQ4",
      question: "Mi propiedad tiene una hipoteca vigente con el banco, ¿puedo venderla?",
      answer:
        "Sí, absolutamente. Se realiza a través de un procedimiento llamado 'Alzamiento Simultáneo'. En la misma escritura de compraventa, parte del dinero del comprador (o su banco) se destina a pagar tu deuda, el banco alza la hipoteca, y el saldo restante te queda a ti.",
    },
    {
      id: "sellQ5",
      question: "¿Qué pasa si el comprador se arrepiente después de firmar la Promesa?",
      answer:
        "Para eso es la Promesa de Compraventa. Al firmarla, se establecen multas (generalmente entre el 10% y el 20% del valor de venta) que quedan respaldadas con documentos en custodia en la notaría. Si el comprador desiste sin una causa legal válida, la notaría te entrega ese dinero como compensación.",
    },
    {
      id: "sellQ6",
      question: "¿Cómo se define el precio de venta real de mi propiedad en Magallanes?",
      answer:
        "El precio no lo define el avalúo fiscal ni el valor emocional. Se define mediante una Tasación Comercial, comparando tu propiedad con inmuebles similares vendidos recientemente en tu sector (Punta Arenas, Natales, etc.), considerando el valor del suelo, construcción, estado de conservación y demanda actual.",
    },
    {
      id: "sellQ7",
      question: "¿Qué es la Recepción Final y por qué me la piden para vender?",
      answer:
        "Es un certificado emitido por la Dirección de Obras Municipales (DOM) que acredita que tu casa fue construida según los planos aprobados y cumple la normativa legal. Si ampliaste tu casa sin regularizar, los bancos no le otorgarán crédito hipotecario al comprador. Es fundamental regularizar antes de vender.",
    },
    {
      id: "sellQ8",
      question: "¿Cuánto tiempo demora todo el proceso de venta en promedio?",
      answer:
        "Depende de cómo pague el comprador. Si es al contado, desde la firma de la promesa hasta el pago final pueden pasar 30-45 días. Si el comprador usa crédito hipotecario, la burocracia bancaria y del Conservador puede extender el proceso de 2 a 4 meses.",
    },
    {
      id: "sellQ9",
      question: "¿Cuándo y cómo recibo exactamente el dinero de la venta?",
      answer:
        "Por seguridad de ambas partes, en Chile no se transfieren fondos directamente el día de la firma. El comprador deja Instrucciones Notariales y Vales Vista bancarios a tu nombre retenidos en la notaría. El notario solo te entregará ese dinero físico una vez que la propiedad quede inscrita a nombre del comprador en el CBR.",
    },
    {
      id: "sellQ10",
      question: "¿Por qué me conviene firmar exclusividad con AC Propiedades?",
      answer:
        "Trabajar en exclusiva centraliza la responsabilidad. Nosotros invertiremos recursos en marketing destacado, fotografías profesionales, seremos el único filtro para visitas (evitando curiosos), y defenderemos el precio de tu propiedad, en lugar de competir con otros corredores bajando el valor para llevarse la venta.",
    },
  ];

  return (
    <div className="accordion" id="accordionSellers">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseSell${index}`}
              aria-expanded={index === 0 ? "true" : "false"}
              aria-controls={`collapseSell${index}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapseSell${index}`}
            className={`accordion-collapse collapse ${
              index === 0 ? "show" : ""
            }`}
            aria-labelledby={item.id}
            data-parent="#accordionSellers"
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

export default Faq2;
