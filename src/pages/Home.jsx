import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";

/**
 * Home
 * The landing page. Projects now lives on its own route (/projects),
 * so it isn't rendered here — everything else stays as one scrollable page.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Certificates />
      <Contact />
    </>
  );
}
