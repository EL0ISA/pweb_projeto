import { Carousel, Nav, About } from "./components"; // Importa o componente

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo à Página Inicial</h1>
      <Nav />
      <Carousel />
      <About />
    </div>
  );
}
