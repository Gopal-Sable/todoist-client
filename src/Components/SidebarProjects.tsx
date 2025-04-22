import { MdAdd, MdChevronRight, MdExpandMore } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import { Project } from "../utils/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProjectAPI } from "../utils/apiCalls";
import { deleteProject } from "../store/projectSlice";

type props = {
    name: string;
    projects: Project[];
    isLoading: Boolean;
};
const SidebarProjects = ({ name, projects, isLoading }: props) => {
    const [showProjects, setShowProjects] = useState<boolean>(true);
    const toggleProjects = (): void => setShowProjects((prev) => !prev);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            deleteProjectAPI(id);
            dispatch(deleteProject(id));
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="mt-6">
            <Link
                to="/home"
                className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white mb-2 text-sm"
            >
                <div className="flex items-center gap-2">
                    <span className="uppercase tracking-wide">{name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MdAdd />
                    {showProjects ? (
                        <MdExpandMore onClick={toggleProjects} />
                    ) : (
                        <MdChevronRight onClick={toggleProjects} />
                    )}
                </div>
            </Link>

            {showProjects &&
                (isLoading ? (
                    <div>loading...</div>
                ) : (
                    <ul className="space">
                        {projects.map((project) => (
                            <li
                                key={project.id}
                                className="btn btn-ghost w-full justify-between text-sm  bg-red-950"
                            >
                                <NavLink
                                    to={`/project/${project.id}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-red-500"
                                            : "text-white hover:bg-gray-800 "
                                    }
                                    aria-label={`Go to project ${project.name}`}
                                >
                                    <span
                                        style={{
                                            color: project.color || "#aaa",
                                        }}
                                    >
                                        #
                                    </span>
                                    <span className="ml-3">{project.name}</span>
                                </NavLink>
                                <span className="dropdown dropdown-right">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn m-1"
                                    >
                                        ...
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-box z-10  w-52 p-2 shadow-sm"
                                    >
                                        <li>
                                            <a>Item 1</a>
                                        </li>
                                        <li>
                                            <a>Item 2</a>
                                        </li>
                                    </ul>
                                </span>
                                {/* <span
                                    className="hover:shadow-amber-950  cursor-pointer"
                                    onClick={(e) =>
                                        handleDelete(e, Number(project.id))
                                    }
                                >
                                    . . .
                                </span> */}
                            </li>
                        ))}
                    </ul>
                ))}
        </div>
    );
};

export default SidebarProjects;
