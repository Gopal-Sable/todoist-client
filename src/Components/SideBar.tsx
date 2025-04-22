import { JSX, useEffect, useState } from "react";
import {
    MdMenu,
    MdClose,
    MdInbox,
    MdToday,
    MdCalendarMonth,
    MdSettings,
} from "react-icons/md";
import { ApiResponse, Project } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getProjects } from "../utils/apiCalls";
import { setProjects } from "../store/projectSlice";
import SidebarProjects from "./SidebarProjects";

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const toggleSidebar = (): void => setIsOpen((prev) => !prev);

    const menuItems: { icon: JSX.Element; label: string }[] = [
        { icon: <MdInbox />, label: "Inbox" },
        { icon: <MdToday />, label: "Today" },
        { icon: <MdCalendarMonth />, label: "Upcoming" },
    ];

    const projects: Project[] = useSelector(
        (store: RootState) => store.projects
    );
    const favroiteProjects = projects.filter((project) => project.is_favorite);
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
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`h-screen  bg-black text-white transition-all duration-300 ease-in-out ${
                    isOpen ? "w-64" : "w-16"
                } flex flex-col p-4`}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    {isOpen && <div className="text-lg font-bold">Todoist</div>}
                    <button
                        className="text-white hover:text-gray-400 text-2xl ml-auto"
                        onClick={toggleSidebar}
                    >
                        {isOpen ? <MdClose /> : <MdMenu />}
                    </button>
                </div>

                {isOpen && (
                    <div className="overflow-y-scroll">
                        {/* Main Menu */}
                        <ul className="space-y-2">
                            {menuItems.map(({ icon, label }) => (
                                <li key={label}>
                                    <button className="btn btn-ghost w-full justify-start hover:bg-gray-800 text-white">
                                        <span className="text-xl">{icon}</span>
                                        <span className="ml-3">{label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Projects Section */}
                        <SidebarProjects
                            name="Favorites"
                            isLoading={isLoading}
                            projects={favroiteProjects}
                        />
                        <SidebarProjects
                            name="My Projects"
                            isLoading={isLoading}
                            projects={projects}
                        />
                    </div>
                )}
                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-700">
                    <button className="btn btn-ghost w-full justify-start hover:bg-gray-800 text-white">
                        <MdSettings className="text-xl" />
                        {isOpen && (
                            <span className="ml-3">Browse Templates</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
