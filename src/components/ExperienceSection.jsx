import {ExternalLink, Github, X} from "lucide-react";
import { useState } from "react";

export const ExperienceSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Data Science Fellow",
      employer: "University of California, Riverside, Information Technology Services Department",
      fullDescription: "Led the refinement of a predictive model utilizing CatBoostRegression to forecast course demand, enabling UCR departments to optimize course scheduling, room assignments, and time slots. Integrated diverse datasets including historical course enrollments, student academic plans, incoming freshman applications, and major-specific course progression (via transition graphs) to enrich features for improved model accuracy. Evaluated model performance using Mean Absolute Error (MAE) and Mean Absolute Percentage Error (MAPE), consistently achieving <15% MAPE for 95% of courses, demonstrating high predictive accuracy.",
      image: "https://placehold.co/400x250/ADD8E6/000000?text=Data+Science", // Placeholder image
      tags: ["CatBoostRegression", "Data Science", "Predictive Modeling", "Python", "Data Integration"],
      demoUrl: "#", // Not applicable for this experience
      githubUrl: "#", // Not applicable for this experience
    },
    {
      id: 2,
      title: "Machine Learning Research Assistant",
      employer: "University of California, Riverside's Computer Science Research Lab",
      fullDescription: "Developed and trained machine learning time series classification models using the MiniRocket classifier across 106 UCR datasets, achieving an average accuracy of ~92%. Currently implementing and benchmarking the model on an FPGA for low-latency inference, evaluating prediction runtime against a high-performance CPU baseline and observing preliminary speedups exceeding 20x.",
      image: "https://placehold.co/400x250/90EE90/000000?text=ML+Research", // Placeholder image
      tags: ["Machine Learning", "Time Series", "MiniRocket", "FPGA", "Benchmarking", "Python"],
      demoUrl: "#", // Not applicable for this experience
      githubUrl: "#", // Not applicable for this experience
    },
    {
      id: 3,
      title: "Machine Learning Intern",
      employer: "Reeko Cabinets, LLC",
      fullDescription: "Consolidated and cleaned historical sales data (100+ sources) and inventory records (1000+ cabinet pieces). Developed a machine learning linear regression model to forecast bi-monthly parts demand, improving prediction accuracy by an estimated 25% compared to prior manual methods. Designed the automated ordering model to maintain target surplus levels, minimizing stockout incidents.",
      image: "https://placehold.co/400x250/FFD700/000000?text=ML+Intern", // Placeholder image
      tags: ["Machine Learning", "Linear Regression", "Data Cleaning", "Forecasting", "Python", "Pandas"],
      demoUrl: "#", // Not applicable for this experience
      githubUrl: "#", // Not applicable for this experience
    },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="experience" className="py-24 px-4 relative"> {/* Changed id to 'experience' */}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          My <span className="text-primary"> Experience </span> {/* Changed title */}
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my professional and research experiences. Click on any entry to learn more! {/* Changed description */}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
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
                <p className="text-muted-foreground text-sm mb-2">
                  {project.employer} {/* Display employer */}
                </p>
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
            <h3 className="text-2xl font-bold mb-1">{selectedProject.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {selectedProject.employer} {/* Display employer in modal */}
            </p>
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