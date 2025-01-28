"use client"; // Indica que será renderizado no cliente
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Carousel() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap");
    }
  }, []);
  const router = useRouter();

  // Função para navegação
  const handleClick = (route) => {
    router.push(route);
  };

  return (
    <section id="page-top">
      {/* Carousel */}
      <div id="main-slide" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <ol className="carousel-indicators">
          <li
            data-bs-target="#main-slide"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li data-bs-target="#main-slide" data-bs-slide-to="1"></li>
          <li data-bs-target="#main-slide" data-bs-slide-to="2"></li>
        </ol>
        {/*/ Indicators end */}

        {/* Carousel inner */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link href="#">
              {" "}
              <img
                className="img-responsive d-block w-100"
                src="/carousel_0.png"
                alt="carousel image 1"
              />
            </Link>
            <div className="slider-content text-center"></div>
          </div>
          {/*/ Carousel item end */}

          <div className="carousel-item">
            <Link href="/calculadora_ano_pessoal">
              {" "}
              <img
                className="img-responsive d-block w-100"
                src="/carousel_2.png"
                alt="slider"
              />
            </Link>
          </div>
          {/*/ Carousel item end */}

          <div className="carousel-item">
            <Link href="/calculadora_arcano">
              {" "}
              <img
                className="img-responsive d-block w-100"
                src="/carousel_1.png"
                alt="slider"
              />
            </Link>
          </div>
          {/*/ Carousel item end */}
        </div>
        {/* Carousel inner end */}

        {/* Controls */}
        <a
          className="carousel-control-prev"
          href="#main-slide"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#main-slide"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
      {/* /carousel */}
    </section>
  );
}
