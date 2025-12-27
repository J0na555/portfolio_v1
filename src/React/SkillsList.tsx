import React, { useState } from "react";

const CategoryIcons = {
  "Web Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M3 4C2.44772 4 2 4.44772 2 5V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44772 21.5523 4 21 4H3ZM20 8H4V18H20V8ZM6 6H8V7H6V6ZM10 6H12V7H10V6ZM14 6H18V7H14V6Z" />
    </svg>
  ),

  "Backend Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M4 4C2.89543 4 2 4.89543 2 6V9C2 10.1046 2.89543 11 4 11H20C21.1046 11 22 10.1046 22 9V6C22 4.89543 21.1046 4 20 4H4ZM4 13C2.89543 13 2 13.8954 2 15V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V15C22 13.8954 21.1046 13 20 13H4ZM6 7H8V8H6V7ZM6 16H8V17H6V16Z" />
    </svg>
  ),

  "Software Engineering & Tools": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.53 5.05 19.26 4.97 19.03 5.05L16.56 6.05C16.05 5.65 15.5 5.33 14.91 5.09L14.5 2.5C14.47 2.22 14.23 2 13.94 2H10.06C9.77 2 9.53 2.22 9.5 2.5L9.09 5.09C8.5 5.33 7.95 5.65 7.44 6.05L4.97 5.05C4.74 4.97 4.47 5.05 4.34 5.27L2.34 8.73C2.22 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.66 4.5 12C4.5 12.34 4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.22 15.05 2.34 15.27L4.34 18.73C4.47 18.95 4.74 19.03 4.97 18.95L7.44 17.95C7.95 18.35 8.5 18.67 9.09 18.91L9.5 21.5C9.53 21.78 9.77 22 10.06 22H13.94C14.23 22 14.47 21.78 14.5 21.5L14.91 18.91C15.5 18.67 16.05 18.35 16.56 17.95L19.03 18.95C19.26 19.03 19.53 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z" />
    </svg>
  ),
};


const SkillsList = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const skills = {
    "Web Development": [
      "Building dynamic and data-driven web apps using Django and REST APIs",
      "Integrating frontend and backend with clean API architecture",
      "Developing CRUD-based systems ",
    ],
    "Backend Development": [
      "Designing and managing databases with MongoDB and PostgreSQL",
      "Implementing authentication and authorization",
      "Optimizing backend logic for performance and scalability",
    ],
    "Software Engineering & Tools": [
      "Version control with Git and GitHub",
      "Working with Linux environments and terminal-based workflows",
      "Using Docker, Postman, and other dev tools for efficient development",
    ],
  };
  
  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="text-left pt-3 md:pt-9">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">
        What I do?
      </h3>
      <ul className="space-y-4 mt-4 text-lg">
        {Object.entries(skills).map(([category, items]) => (
          <li key={category} className="w-full">
            <div
              onClick={() => toggleItem(category)}
              className="md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                {CategoryIcons[category]}
                <div className="flex items-center gap-2 flex-grow justify-between">
                  <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                    <span className="block truncate text-[var(--white)] text-lg">
                      {category}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${
                      openItem === category ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                </div>
              </div>

              <div
                className={`transition-all duration-300 px-4 ${
                  openItem === category
                    ? "max-h-[500px] pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 text-[var(--white-icon)] text-sm">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="pl-1">•</span>
                      <li className="pl-3">{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
