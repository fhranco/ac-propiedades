import Image from "next/image";
import React from "react";

const reviews = [
  {
    name: "Bessie Cooper",
    date: "12 de marzo, 2022",
    rating: 5,
    text: "El segundo dormitorio es amplio, luminoso y cuenta con ventanas de termopanel. La cocina tiene excelente distribución, cocina encimera y logia independiente. Los acabados de piso flotante y calefacción central están en óptimas condiciones. Se entrega completamente amoblado.",
    images: [
      "/images/blog/blog-single-3.jpg",
      "/images/blog/blog-single-4.jpg",
      "/images/blog/blog-single-5.jpg",
      "/images/blog/blog-single-6.jpg",
    ],
  },
  {
    name: "Darrell Steward",
    date: "12 de marzo, 2022",
    rating: 5,
    text: "Excelente departamento con vista despejada. Muy central, cercano a comercios, locomoción colectiva y colegios. El edificio cuenta con accesos controlados y conserjería 24/7. Totalmente recomendado.",
    images: [],
  },
  {
    name: "Darrell Steward",
    date: "12 de marzo, 2022",
    rating: 5,
    text: "Impecable estado de conservación. Espacios comunes amplios y muy bien mantenidos. La gestión del corredor de propiedades fue sumamente ágil y transparente durante todo el proceso de arriendo.",
    images: [],
  },
];

const SingleReview = () => {
  return (
    <>
      {reviews.map((review, index) => (
        <div className="col-md-12" key={index}>
          <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
            <Image
              width={60}
              height={60}
              src="/images/blog/comments-2.png"
              className="mr-3"
              alt="comments-2.png"
            />
            <div className="ml20">
              <h6 className="mt-0 mb-0">{review.name}</h6>
              <div>
                <span className="fz14">{review.date}</span>
                <div className="blog-single-review">
                  <ul className="mb0 ps-0">
                    {[...Array(review.rating)].map((_, i) => (
                      <li className="list-inline-item me-0" key={i}>
                        <a href="#">
                          <i className="fas fa-star review-color2 fz10" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End .d-flex */}

          <p className="text mt20 mb20">{review.text}</p>
          <ul className="mb20 ps-0">
            {review.images.map((image, i) => (
              <li className="list-inline-item mb5-xs" key={i}>
                <Image
                  width={110}
                  height={90}
                  className="bdrs6"
                  src={image}
                  alt="review-img"
                />
              </li>
            ))}
          </ul>

          <div className="review_cansel_btns d-flex bdrb1 pb30">
            <a href="#">
              <i className="fas fa-thumbs-up" />
              Útil
            </a>
            <a href="#">
              <i className="fas fa-thumbs-down" />
              Poco útil
            </a>
          </div>
        </div>
      ))}

      <div className="col-md-12">
        <div className="position-relative bdrb1 pt30 pb20">
          <a href="#" className="ud-btn btn-white2">
            Mostrar las 134 reseñas
            <i className="fal fa-arrow-right-long" />
          </a>
        </div>
      </div>
    </>
  );
};

export default SingleReview;
