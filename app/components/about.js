"use client"; // Indica que será renderizado no cliente

import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap");
    }
  }, []);
  return (
    <section id="about-us" className="about-us-section-1 bg-black white-text">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="section-title text-center">
              <h3>Sobre Nós</h3>
              <p>
                Este projeto foi desenvolvido como parte da disciplina de
                Programação WEB, com o objetivo de proporcionar uma experiência
                interativa para os usuários. Ele permite calcular o Ano Pessoal
                e o Arcano Pessoal, ferramentas baseadas na Numerologia, que
                ajudam a entender os ciclos de vida de uma pessoa de acordo com
                o seu nascimento.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="welcome-section text-center">
              <h4>Beatriz Costa</h4>
              <div className="border"></div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="welcome-section text-center">
              <h4>Eloisa Santos</h4>
              <div className="border"></div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="welcome-section text-center">
              <h4>Giovanna Melo</h4>
              <div className="border"></div>
            </div>
          </div>
        </div>{" "}
        {/* /.row */}
      </div>{" "}
      {/* /.container */}
    </section>
  );
}
