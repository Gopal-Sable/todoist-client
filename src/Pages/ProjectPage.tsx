import { useEffect } from "react";
import { useParams } from "react-router";
import { getTasks } from "../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../store/taskSlice";
import { TaskType } from "../utils/types";
import { RootState } from "../store/store";
import SingleTask from "../Components/SingleTask";
import AddProject from "../Components/AddButton";

const ProjectPage = () => {
    const { id } = useParams();
    const tasks = useSelector((store: RootState) => store.tasks);
    const dispatch = useDispatch();
    const fetchData = async () => {
        if (id) {
            const data: TaskType[] = await getTasks(id);
            dispatch(setTasks(data));
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = () => {
        console.log("Clicked");
    };
    return (
        <div className="flex flex-wrap mx-auto">
            <AddProject name="Task" handleClick={handleClick} />
            {tasks.map((task) => {
                return <SingleTask key={task.id} {...task} />;
            })}
        </div>
    );
};

export default ProjectPage;
