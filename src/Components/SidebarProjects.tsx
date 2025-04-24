import {
    MdAdd,
    MdChevronRight,
    MdExpandMore,
    MdEdit,
    MdDelete,
} from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router";
import { Project } from "../utils/types";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteProjectAPI } from "../utils/apiCalls";
import { deleteProject } from "../store/projectSlice";

type Props = {
    name: string;
    projects: Project[];
    isLoading: boolean;
};

const SidebarProjects = ({ name, projects, isLoading }: Props) => {
    const [showProjects, setShowProjects] = useState(true);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const dropdownRefs = useRef<Record<string, HTMLDivElement | null >>(
        {} as Record<string, HTMLDivElement | null>
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const toggleProjects = () => setShowProjects((prev) => !prev);

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            await deleteProjectAPI(id);
            dispatch(deleteProject(id));
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (
            openDropdownId !== null &&
            dropdownRefs.current[openDropdownId] &&
            !dropdownRefs.current[openDropdownId]?.contains(e.target as Node)
        ) {
            setOpenDropdownId(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [openDropdownId]);

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
                    <ul className="space-y-1">
                        {projects.map((project) => (
                            <li
                                key={project.id}
                                className={`relative flex items-center justify-between cursor-pointer group rounded-lg px-3 py-2 ${
                                    String(project.id) === id
                                        ? "bg-red-950"
                                        : " hover:bg-gray-800"
                                } `}
                                onClick={() =>
                                    navigate(`/project/${project.id}`)
                                }
                            >
                                <div
                                    // to={`/project/${project.id}`}
                                    className={`flex items-center text-sm ${
                                        String(project.id) === id
                                            ? "text-red-500"
                                            : "text-white"
                                    }`}
                                >
                                    <span
                                        className="mr-2 text-lg"
                                        style={{
                                            color:
                                                project.color || "var(--gray)",
                                        }}
                                    >
                                        #
                                    </span>
                                    {project.name}
                                </div>

                                {/* ... Dropdown Trigger */}
                                <div
                                    className="ml-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDropdownId((prev) =>
                                            prev === Number(project.id)
                                                ? null
                                                : Number(project.id)
                                        );
                                    }}
                                >
                                    ...
                                </div>

                                {/* Dropdown Menu */}
                                {openDropdownId === project.id && (
                                    <div
                                        ref={(el: HTMLDivElement | null) =>
                                            (dropdownRefs.current[project.id] =
                                                el)
                                        }
                                        className="absolute z-50 bg-base-100 right-0 top-10 rounded-lg shadow-lg w-48 py-2 text-sm text-gray-800"
                                        style={{ minWidth: "10rem" }}
                                    >
                                        <button
                                            onClick={() =>
                                                console.log("Edit project")
                                            }
                                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                                        >
                                            <MdEdit className="inline mr-2" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) =>
                                                handleDelete(
                                                    e,
                                                    Number(project.id)
                                                )
                                            }
                                            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                                        >
                                            <MdDelete className="inline mr-2" />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ))}
        </div>
    );
};

export default SidebarProjects;
