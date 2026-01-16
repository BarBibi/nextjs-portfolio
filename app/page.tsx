import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
      <main>
        <Hero
          name="Bar Bibi"
          role="Computer Science Student & Software Developer"
          description="Building innovative solutions through code and creativity."
          email="your.email@example.com"
          github="https://github.com/yourusername"
          linkedin="https://linkedin.com/in/yourusername"
        />
      </main>
    </div>
  );
}
