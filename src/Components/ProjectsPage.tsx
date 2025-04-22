import React from "react";
import ProjectsHero from "./ProjectsHero";
import ProjectListNew from "./ProjectListNew";
import { Project } from "../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProjectsPage: React.FC = () => {
    const projects: Project[] = useSelector(
        (store: RootState) => store.projects
    );


    return (
        <div className="flex-1 bg-[#1E1E1E] min-h-screen text-white p-6">
            <ProjectsHero total={projects.length} />
            <ProjectListNew projects={projects} />
        </div>
    );
};


export default ProjectsPage;
