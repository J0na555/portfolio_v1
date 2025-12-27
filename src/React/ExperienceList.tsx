import React, { useState } from "react";

const ExperienceList = () => {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const experiences = [
        {
            title: "Backend Developer — Freelance",
            date: "Jan 2024 - Present",
            items: [
                "Built REST APIs using Django REST Framework and Spring Boot.",
                "Integrated MongoDB and PostgreSQL for dynamic data-driven apps.",
                "Collaborated with small startups to develop efficient backend systems.",
            ],
        },
        {
            title: "Full Stack Developer (Personal Projects)",
            date: "2023 – Present",
            items: [
                "Built full-stack web apps using Node.js, Express, and MongoDB.",
                "Created RESTful APIs with authentication, CRUD, and database integrations.",
                "Developed responsive UIs with React, TailwindCSS, and modern design practices.",
                "Deployed projects using GitHub, Vercel, and Docker for personal learning.",
                "Focused on writing clean, reusable code and improving backend architecture skills.",
            ],
        },
    ];

    const toggleItem = (title: string) => {
        setOpenItem(openItem === title ? null : title);
    };

    return (
        <div className="space-y-6 mt-12 text-left">
            {experiences.map((exp) => (
                <div key={exp.title} className="w-full">
                    <div
                        onClick={() => toggleItem(exp.title)}
                        className="w-full bg-[#ffffff08] rounded-xl text-left hover:bg-[#ffffff0c] transition-all border border-[#ffffff10] cursor-pointer overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-6">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl font-medium text-[var(--white)] line-clamp-1">
                                    {exp.title}
                                </h3>
                                <p className="text-[var(--white-icon)] text-sm">{exp.date}</p>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`w-6 h-6 text-[var(--white-icon)] transform transition-transform flex-shrink-0 ${openItem === exp.title ? "rotate-180" : ""
                                    }`}
                            >
                                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                            </svg>
                        </div>

                        <div
                            className={`transition-all duration-300 px-6 ${openItem === exp.title
                                    ? "max-h-[500px] pb-6 opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                        >
                            <ul className="space-y-2 text-[var(--white-icon)] text-base">
                                {exp.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-[var(--sec)] mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExperienceList;
