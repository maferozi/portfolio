import IconCloud from "./ui/icon-cloud";

const slugs = [
  "react",
  "nextdotjs",
  "nodejs",
  "express",
  "postgresql",
  "mqtt",
  "websockets",
  "tailwindcss",
  "leaflet",
  "openai",
  "pinecone",
  "ai",
  "llm",
  "github",
  "git",
  "docker",
  "vercel",
  "prisma",
  "firebase",
  "figma",
  "visualstudiocode",
  "gitlab",
  "sonarqube",
  "typescript",
  "javascript",
  "aws",          
  "kubernetes",   
  "graphql",       
  "npm",          
  "babel",         
  "heroku",        
];



function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg  px-20 pb-20 pt-8 bg-transparent">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

export default IconCloudDemo;
