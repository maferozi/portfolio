import HeroImg from "@/assets/images/profileIMG.webp";


export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
          Crafting-Code. Shaping-Ideas. Solving-Problems. Exploring-AI.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow block"
                  alt="payments illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
  <p className="text-white">
    Hello! I'm <span className="font-bold text-white">M. Asad Ferozi</span>, a passionate Full-Stack Developer with a love for AI and real-time systems. I specialize in building smart, scalable web applications that solve real-world problems.{" "}
    <span className="font-bold text-white">
      From geofencing solutions to AI-powered apps, I'm dedicated to pushing the boundaries of technology.
    </span>
  </p>
  <p className="text-white">
    My journey spans front-end development with React and Next.js, backend systems with Node.js, and real-time communication using MQTT and WebSockets. Currently, I'm expanding my expertise in AI and machine learning, leveraging OpenAI, Pinecone, and LLMs to create intelligent solutions.
  </p>

  <div className="pt-1">
    <blockquote className="border-l-4 border-gray-300 pl-4">
      <p className="text-white">
        I’m a lifelong learner, constantly exploring new technologies to craft efficient, user-friendly experiences. Whether it’s real-time tracking systems or legal AI assistants, I’m always working on innovative projects that empower others.
      </p>

      <div className="mt-6 space-y-3">
        <cite className="block font-medium text-white">
          M. Asad Ferozi, Developer & Innovator
        </cite>
        <div className="flex items-center gap-2">

          <span className="text-white">AI & Real-Time Solutions</span>
        </div>
      </div>
    </blockquote>
  </div>
</div>

          </div>
        </div>
      </section>
    </>
  );
}
