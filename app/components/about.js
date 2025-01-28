"use client"; // Indica que será renderizado no cliente

import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap");
    }
  }, []);
  return (
    <section id="about-us" className="about-us-section-1">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="section-title text-center">
              <h3>Sobre Nós</h3>
              <p>
                O projeto foi elaborado para a disciplina de Programação WEB,
                onde ele calcula seu ano e arcanopessoal. <br />
                Foi desenvolvido por:
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
