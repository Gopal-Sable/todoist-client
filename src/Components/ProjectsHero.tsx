import { FaSearch } from "react-icons/fa";
import AddProject from "./AddButton";

interface ProjectsHeroProps {
    total: number;
}

const ProjectsHero: React.FC<ProjectsHeroProps> = ({ total }) => {
    return (
        <div className="px-6 py-6 border-b border-gray-800">
            <h1 className="text-2xl font-semibold text-white">My Projects</h1>
            <p className="text-sm text-gray-400 mt-1">Free plan</p>

            <div className="mt-6 flex items-center gap-3">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                        type="text"
                        placeholder="Search projects"
                        className="input input-sm bg-zinc-900 pl-9 w-full border border-gray-700 text-white"
                    />
                </div>
                <AddProject name="Project" />
            </div>

            <p className="text-sm text-gray-400 mt-4">{total} projects</p>
        </div>
    );
};

export default ProjectsHero;
