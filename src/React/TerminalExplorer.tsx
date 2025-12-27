import React, { useState } from 'react';

interface ProjectManifest {
    service: string;
    runtime: string;
    database: string;
    architecture: string;
    status: string;
    description: string;
    github: string;
    preview: string;
}

interface TerminalExplorerProps {
    projects: ProjectManifest[];
}

const TerminalExplorer: React.FC<TerminalExplorerProps> = ({ projects }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedProject = projects[selectedIndex];

    const getFileName = (serviceName: string) => {
        return serviceName.toLowerCase().replace(/\s+/g, '_') + '.service';
    };

    return (
        <div className="w-full bg-[#ffffff05] backdrop-blur-md border border-[#ffffff10] rounded-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-[#ffffff08] border-b border-[#ffffff10] px-4 py-3 flex items-center gap-3">
                <pre className="text-[#1793d1] text-[3px] leading-[0.5] select-none">
                    {`⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣷⣤⣙⢻⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⡿⠛⠛⠿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⠿⣆⠀⠀⠀⠀
⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀
⠀⢀⣾⣿⣿⠿⠟⠛⠋⠉⠉⠀⠀⠀⠀⠀⠀⠉⠉⠙⠛⠻⠿⣿⣿⣷⡀⠀
⣠⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣄
`}
                </pre>
                <span className="text-sm text-[var(--white-icon)] font-mono">
                    ~/yonas/projects.bash
                </span>
            </div>

            {/* Terminal Body */}
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-[500px]">
                {/* Sidebar - File Tree */}
                <div className="border-r border-[#ffffff10] bg-[#ffffff03] p-4">
                    <div className="text-xs text-[var(--sec)] font-mono mb-3">SERVICES/</div>
                    <div className="space-y-1">
                        {projects.map((project, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={`w-full text-left px-3 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${selectedIndex === index
                                    ? 'bg-[var(--sec)] text-[var(--background)]'
                                    : 'text-[var(--white-icon)] hover:bg-[#ffffff08] hover:text-white'
                                    }`}
                            >
                                📄 {getFileName(project.service)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Editor Area - Manifest Display */}
                <div className="p-6 font-mono text-sm overflow-auto">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[var(--sec)]">$</span>
                            <span className="text-[var(--white)]">cat {getFileName(selectedProject.service)}</span>
                        </div>

                        {/* JSON-style Manifest */}
                        <div className="text-[var(--white-icon)] leading-relaxed">
                            <div className="text-white">{'{'}</div>
                            <div className="pl-4">
                                <div>
                                    <span className="text-[var(--sec)]">"service"</span>
                                    <span className="text-white">: </span>
                                    <span className="text-[#00ca4e]">"{selectedProject.service}"</span>
                                    <span className="text-white">,</span>
                                </div>
                                <div>
                                    <span className="text-[var(--sec)]">"runtime"</span>
                                    <span className="text-white">: </span>
                                    <span className="text-[#00ca4e]">"{selectedProject.runtime}"</span>
                                    <span className="text-white">,</span>
                                </div>
                                <div>
                                    <span className="text-[var(--sec)]">"database"</span>
                                    <span className="text-white">: </span>
                                    <span className="text-[#00ca4e]">"{selectedProject.database}"</span>
                                    <span className="text-white">,</span>
                                </div>
                                <div>
                                    <span className="text-[var(--sec)]">"architecture"</span>
                                    <span className="text-white">: </span>
                                    <span className="text-[#00ca4e]">"{selectedProject.architecture}"</span>
                                    <span className="text-white">,</span>
                                </div>
                                <div>
                                    <span className="text-[var(--sec)]">"status"</span>
                                    <span className="text-white">: </span>
                                    <span className="text-[#ffbd44]">"{selectedProject.status}"</span>
                                    <span className="text-white">,</span>
                                </div>
                                <div>
                                    <span className="text-[var(--sec)]">"description"</span>
                                    <span className="text-white">: </span>
                                    <span className="text-[#e0e0e0]">"{selectedProject.description}"</span>
                                </div>
                            </div>
                            <div className="text-white">{'}'}</div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6 pt-4 border-t border-[#ffffff10]">
                            <a
                                href={selectedProject.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-[#ffffff08] hover:bg-[#ffffff15] border border-[var(--white-icon-tr)] rounded-lg text-[var(--white-icon)] hover:text-white transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
                                </svg>
                                <span className="font-mono text-sm">View Source</span>
                            </a>
                            <a
                                href={selectedProject.preview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-[var(--sec)] hover:bg-[#9060ff] text-[var(--background)] rounded-lg transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                                </svg>
                                <span className="font-mono text-sm">Launch Service</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TerminalExplorer;
