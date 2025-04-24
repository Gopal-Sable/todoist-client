// import TaskModal from "../Components/temp/TaskModal";
import TaskList from "../Components/TaskList";
import Sidebar from "../Components/SideBar";

const ProjectPage = () => {
    return (
        <div className="flex w-full">
            {/* <TaskModal /> */}

            {/* <AddProject name="Task" /> */}
            <div className="flex overflow-y-scroll  w-full">
                <Sidebar />
                <TaskList projectTitle="Sports" />
            </div>
        </div>
    );
};

export default ProjectPage;
