import { useEffect,useState } from "react";
import {  ProjectApiData } from "../utils/types";
import AddProject from "./AddProject";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../store/projectSlice";
import { RootState } from "../store/store";

const ProjectList = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.projects);
    const fetchData = async () => {
        const data: ProjectApiData = await getProjects();
        console.log(data);

        dispatch(setProjects(data?.projects));
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-wrap">
            <AddProject />
            {projects &&
                projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
        </div>
    );
};

export default ProjectList;
