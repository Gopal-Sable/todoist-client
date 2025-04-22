import Modal from "../Components/Modal";
// import ProjectList from "../Components/ProjectList";
import ProjectsPage from "../Components/ProjectsPage";
import SideBar from "../Components/SideBar";
// import TaskList from "../Components/TaskList";

const Home = () => {
    return (
        <div className="flex w-screen">
            <Modal />
            <div className="flex w-full">
                <SideBar />
                <ProjectsPage />
            </div>
        </div>
    );
};

export default Home;
