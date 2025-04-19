import { useEffect, useState } from "react";
import { ApiResponse, Project } from "../utils/types";
import AddProject from "./AddButton";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../store/projectSlice";
import { RootState } from "../store/store";

const ProjectList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.projects);
    const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const data: ApiResponse<Project[], "projects"> =
                await getProjects();
            dispatch(setProjects(data?.projects));
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    isError && <h1>Something went wrong!!</h1>;

    return (
        <div className="flex flex-wrap">
            <AddProject name="Project" />
            {isLoading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))
            )}
        </div>
    );
};

export default ProjectList;
