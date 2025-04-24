import { Link } from "react-router";
import { Project } from "../utils/types";
import { setModalProject, toggleModal } from "../store/appConfigSlice";
import { useDispatch } from "react-redux";
import { deleteProjectAPI } from "../utils/apiCalls";
import { deleteProject } from "../store/projectSlice";

const ProjectListNew: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const dispatch = useDispatch();
    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            deleteProjectAPI(id);
            dispatch(deleteProject(id));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ul className="px-6 mt-2 space-y-2">
            {projects.map((project) => (
                <li
                    key={project.id}
                    className="flex items-center gap-3 text-sm text-white hover:bg-zinc-800 px-3 py-2 rounded cursor-pointer"
                >
                    <span
                        className="text-sm"
                        style={{ color: project.color || "#aaa" }}
                    >
                        #
                    </span>
                    <Link to={"/project/" + project.id} className="flex-1">
                        {project.name}
                    </Link>
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setModalProject(project));
                            dispatch(toggleModal());
                        }}
                    >
                        Edit
                    </span>
                    <span onClick={(e) => handleDelete(e, Number(project.id))}>
                        Delete
                    </span>

                    {project !== undefined && (
                        <span className="text-xs text-gray-500">10</span>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ProjectListNew;
