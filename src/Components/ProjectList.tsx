import { useEffect } from "react";
import { ApiResponse, Project } from "../utils/types";
import AddProject from "./AddButton";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../store/projectSlice";
import { RootState } from "../store/store";

const ProjectList = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.projects);
    const fetchData = async () => {
        const data: ApiResponse<Project[], "projects"> = await getProjects();
        dispatch(setProjects(data?.projects));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = () => {
        console.log("clicked");
    };
    return (
        <div className="flex flex-wrap">
            <AddProject name="Project" handleClick={handleClick} />
            {projects &&
                projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
        </div>
    );
};

export default ProjectList;
