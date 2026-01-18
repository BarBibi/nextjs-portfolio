import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
      <main>
        <Hero
          name="Bar Bibi"
          role="Computer Science Student & Software Developer"
          description="Building innovative solutions through code and creativity."
          email="barbibi7556@gmail.com"
          github="https://github.com/BarBibi"
          linkedin="https://www.linkedin.com/in/bar-bibi-computer-science"
          imageSrc="/ProfilePicture.jpg"
        />
      </main>
    </div>
  );
}
