interface HeroProps {
  name: string;
  role: string;
  description: string;
  email: string;
  github: string;
  linkedin: string;
}

export default function Hero({ name, role, description, email, github, linkedin }: HeroProps) {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {name}
        </h1>
        <h2 className="text-xl md:text-2xl text-foreground/80 mb-6">
          {role}
        </h2>
        <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${email}`}
            className="px-8 py-3 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity font-medium"
          >
            Email
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity font-medium"
          >
            GitHub
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity font-medium"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
