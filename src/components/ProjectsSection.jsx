import { ArrowRight, ExternalLink, Github, X} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Assuming this utility is available for class names

// Helper function to get random items from an array (useful for "all" category with limit)
const getRandomItems = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const initialProjectLimit = 6; // Limit to 3 projects per category (when not "all")
  const allProjectsInitialLimit = 7; // Initial limit for the "all" category

  const projects = [
    {
      id: 1,
      title: "UCR Course Scheduler",
      shortDescription: "An AI chatbot for optimized course scheduling, leveraging GPT-4.0 mini, MongoDB, and RAG.",
      fullDescription: "Engineered a student-facing, Python-based AI chatbot application utilizing GPT-4.0 mini, providing an interactive, conversational experience for generating optimized course schedules. Architected a robust data backend, including MongoDB for course offerings and a vector database for semantic search (class description vs. user query), facilitating Retrieval Augmented Generation (RAG) for contextual and accurate recommendations. Implemented core chatbot functionalities enabling students to input preferences, modify four-year plans, receive dynamic schedule adjustments, and access real-time substitutions for full sections.",
      image: "https://placehold.co/400x250/AEC6CF/000000?text=UCR+Scheduler", // Placeholder image
      tags: ["AI Agents", "OpenAI API", "MongoDB", "Vector Databases", "Chatbot Development"],
      categories: ["AI/ML"], // Changed to array
      demoUrl: "#", // Placeholder: No actual demo link provided
      githubUrl: "https://github.com/Rishi-Dave/ucr_course_scheduler",
    },
    {
      id: 2,
      title: "R'Eats AI",
      shortDescription: "A Flask-based full-stack web app providing AI-powered personalized restaurant recommendations.",
      fullDescription: "Developed a full-stack web application using Flask to provide personalized restaurant recommendations based on natural language user queries (e.g., cuisine, budget, ambiance) for Riverside, CA. Collected, cleaned, and structured data for 200 local restaurants using Yelp API and Pandas, then fine-tuned the GPT-3.5 Turbo LLM on 1000 curated instruction-response pairs derived from the dataset.",
      image: "https://placehold.co/400x250/DDA0DD/000000?text=R'Eats+AI", // Placeholder image
      tags: ["Yelp API", "OpenAI API", "Fine Tuning", "Full-Stack Development", "Flask"],
      categories: ["Full Stack", "AI/ML"], // Changed to array
      demoUrl: "https://r-eats-ai-9b7a936e9ee4.herokuapp.com/",
      githubUrl: "https://github.com/Rishi-Dave/r-eats.ai",
    },
    {
      id: 3,
      title: "Cricket T20 Analyzer",
      shortDescription: "An end-to-end data analytics project for T20 Cricket, featuring web scraping, Pandas, and Power BI dashboards.",
      fullDescription: "Executed an end-to-end data analytics project involving web scraping T20 World Cup 2022 data (Bright Data), cleaning/processing (~200 players, >50k data points) with Pandas, and building a relational data model in Power BI. Designed and deployed interactive Power BI dashboards featuring 15+ custom DAX KPIs to visualize performance trends and provide analytical tools supporting the identification of top players for an 'All-Star' team selection.",
      image: "https://placehold.co/400x250/B0E0E6/000000?text=Cricket+Analyzer", // Placeholder image
      tags: ["Pandas", "Microsoft Power BI", "Web Scraping", "Data Analysis"],
      categories: ["Analytics"], // Changed to array
      demoUrl: "#",
      githubUrl: "https://github.com/Rishi-Dave/cricket_analysis",
    },
    {
      id: 4,
      title: "CommentPro AI",
      shortDescription: "A VS Code extension utilizing OpenAI's API for inline code documentation and formatting.",
      fullDescription: "Developed a VS Code extension utilizing OpenAI's API to generate inline code documentation. Fine-tuned the LLM using a dataset containing 100k+ cleanly coded Python files to implement a code cleaning feature that automatically formats code using universal standards.",
      image: "https://placehold.co/400x250/C5E1A5/000000?text=CommentPro+AI", // Placeholder image
      tags: ["Prompt Engineering", "OpenAI API", "JavaScript", "Microsoft Visual Studio Code"],
      categories: ["AI/ML"], // Changed to array
      demoUrl: "#", // No specific demo link provided
      githubUrl: "#", // No specific GitHub link provided for this entry
    },
    {
      id: 5,
      title: "Terminal Library System",
      shortDescription: "A C++ terminal-based library system with user authentication and book management.",
      fullDescription: "Created a terminal library in which a user can sign in and checkout/return books with their account. Implemented a .txt file-based database to save and restore book and user information between sessions. As Project Lead, created the UML diagram for class relationships and Navigation Diagram for functionality. Applied SCRUM methodology and used a Kanban Board to track user stories within our sprints.",
      image: "https://placehold.co/400x250/FFECB3/000000?text=Library+System", // Placeholder image
      tags: ["C++", "Scrum", "Kanban Board", "Unified Modeling Language (UML)"],
      categories: ["Full Stack"], // Changed to array
      demoUrl: "#", // No specific demo link provided
      githubUrl: "https://github.com/Rishi-Dave/LibrarySystem",
    },
    {
      id: 6,
      title: "Quick Alert: CutieHacks 2023",
      shortDescription: "An iOS app for sending instant emergency alerts to primary contacts.",
      fullDescription: "Developed an iOS app designed to send 9 specific emergency alerts, such as 'house on fire' or 'medical emergency,' to primary contacts instantly. Leveraged Firebase to create a robust backend, ensuring user accounts are securely linked and that emergency notifications are delivered to recipients in under 1 second, potentially saving lives by enabling immediate response.",
      image: "https://placehold.co/400x250/FFDDC1/000000?text=Quick+Alert", // Placeholder image
      tags: ["Swift (Programming Language)", "SwiftUI", "Firebase"],
      categories: ["iOS", "Full Stack"], // Changed to array
      demoUrl: "#", // No specific demo link provided
      githubUrl: "https://github.com/Rishi-Dave/quick_alert",
    },
    {
      id: 8,
      title: "Electronic Waste Project",
      shortDescription: "A website developed with HTML, CSS, and Django to coordinate electronic waste pickups.",
      fullDescription: "Developed and launched a website to coordinate electronic waste pickups using HTML, CSS, and Django. Managed pickup coordination and logistics, implemented updates and improvements for user experience.",
      image: "https://placehold.co/400x250/CFD8DC/000000?text=E-Waste+Project", // Placeholder image
      tags: ["Django", "JavaScript", "Front-End Development", "HTML", "CSS"],
      categories: ["Full Stack"], // Changed to array
      demoUrl: "#", // No specific demo link provided
      githubUrl: "#", // No specific GitHub link provided
    },
  ];

  // Dynamically get categories from projects, add "all", and ensure uniqueness
  // Flatten all category arrays and then create a Set to get unique categories
  const allUniqueCategories = ["all", ...new Set(projects.flatMap(project => project.categories))];

  // Filter projects based on the active category
  let filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.categories.includes(activeCategory) // Updated filtering logic
  );

  // Apply the "show more" logic
  const isAllCategory = activeCategory === "all";
  const hasMoreProjectsThanLimit = isAllCategory
    ? filteredProjects.length > allProjectsInitialLimit
    : filteredProjects.length > initialProjectLimit;

  if (!showAllProjects) {
    if (isAllCategory) {
      filteredProjects = filteredProjects.slice(0, allProjectsInitialLimit);
    } else {
      // For specific categories, randomly pick `initialProjectLimit` projects
      filteredProjects = getRandomItems(filteredProjects, initialProjectLimit);
    }
  }

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setShowAllProjects(false); // Reset showAllProjects when changing categories
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Click on any project to learn more!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allUniqueCategories.map((category, key) => ( // Use allUniqueCategories here
            <button
              key={key}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.shortDescription}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {/* Conditionally render Demo link */}
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {/* Conditionally render GitHub link */}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less button */}
        {hasMoreProjectsThanLimit && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
            >
              {showAllProjects ? "Show Less" : "Show More"}
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Rishi-Dave"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full p-6 relative m-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
            <div className="mb-4">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-muted-foreground text-base mb-4">
                {selectedProject.fullDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4 mt-4">
                {/* Conditionally render Demo link in modal */}
                {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink size={18} /> Demo
                  </a>
                )}
                {/* Conditionally render GitHub link in modal */}
                {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Github size={18} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};