import { useState } from "react";
import { cn } from "@/lib/utils"; // Assuming this utility is available for class names

const skills = [
  // Programming Languages
  { name: "Python", level: 95, category: "Programming" },
  { name: "C++", level: 85, category: "Programming" },
  { name: "Java", level: 80, category: "Programming" },
  { name: "JavaScript", level: 90, category: "Programming" },
  { name: "SQL", level: 85, category: "Programming" },
  { name: "C", level: 75, category: "Programming" },
  { name: "Swift (IOS)", level: 70, category: "Programming" },

  // AI/Machine Learning
  { name: "CatBoost", level: 75, category: "AI/ML" },
  { name: "MiniRocket", level: 85, category: "AI/ML" },
  { name: "OpenAI API", level: 100, category: "AI/ML" },
  { name: "Scikit-learn", level: 80, category: "AI/ML" },
  { name: "TensorFlow", level: 80, category: "AI/ML" },

  // Data Science & Analytics
  { name: "Pandas", level: 90, category: "Analytics" },
  { name: "Jupyter", level: 85, category: "Analytics" },
  { name: "PowerBI", level: 80, category: "Analytics" },
  { name: "Splunk", level: 70, category: "Analytics" },

  // Web Development (Frontend)
  { name: "HTML/CSS", level: 95, category: "Frontend" },
  { name: "React", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Next.js", level: 80, category: "Frontend" },

  // Web Development (Backend)
  { name: "Flask", level: 85, category: "Backend" },
  { name: "Django", level: 75, category: "Backend" },
  { name: "Node.js", level: 70, category: "Backend" },

  // Databases (categorized under Backend in your original list, but separated here for clarity if needed)
  { name: "MongoDB", level: 90, category: "Backend" },
  { name: "MySQL", level: 85, category: "Backend" },
  { name: "Firebase", level: 80, category: "Backend" },
  { name: "Vector Backend", level: 75, category: "Backend" },
  { name: "BigQuery", level: 80, category: "Backend" },

  // Cloud Platforms (categorized under Tools in your original list)
  { name: "Azure", level: 80, category: "Tools" },
  { name: "AWS", level: 75, category: "Tools" },

  // Tools & Version Control
  { name: "Git/GitHub", level: 90, category: "Tools" },
  { name: "VS Code", level: 95, category: "Tools" },
];

const categories = [
  "all",
  "Programming",
  "AI/ML",
  "Analytics",
  "Frontend",
  "Backend",
  "Tools",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  // New state to manage the "show more" functionality for the "all" category
  const [showAllSkills, setShowAllSkills] = useState(false);
  const initialSkillLimit = 9;

  // Filter skills based on the active category
  let filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Apply the "show more" logic only for the "all" category
  const isAllCategory = activeCategory === "all";
  const hasMoreSkillsThanLimit = filteredSkills.length > initialSkillLimit;

  if (isAllCategory && !showAllSkills && hasMoreSkillsThanLimit) {
    filteredSkills = filteredSkills.slice(0, initialSkillLimit);
  }

  // Handle category change and reset showAllSkills state
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Reset showAllSkills to false when switching categories
    if (category !== "all") {
      setShowAllSkills(false);
    }
  };

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary" // Corrected typo: text-forefround to text-foreground
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less button for the "all" category */}
        {isAllCategory && hasMoreSkillsThanLimit && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllSkills(!showAllSkills)}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
            >
              {showAllSkills ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Default export for the App component (assuming this is part of a larger React app)
// If this is the main component, you'd export it as default like this:
// export default SkillsSection;
