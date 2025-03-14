import Image from "next/image";
import "./style.css";

export default function Home() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-description">
          <p>/// Programmer</p>
          <p>/// UX / UI Developer</p>
          <p>/// Designer</p>
        </div>
        <h1>
          Nadid <br />
          Wasique
        </h1>
      </div>
      <div className="hero-functions">
        <div className="hero-timezone">
          <p>Dhaka, Bangladesh</p>
          <p>{}</p>
        </div>
      </div>
    </section>
  );
}
