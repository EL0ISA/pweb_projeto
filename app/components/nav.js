"use client"; // Indica que este componente deve ser renderizado no cliente

import { useState } from "react";
export default function Nav() {
  const [isClient, setIsClient] = useState(false);

  if (typeof document !== "undefined" && !isClient) {
    require("bootstrap");
    setIsClient(true);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#page-top">
          Fate Cycles
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#about-us">
                Sobre Nós
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
