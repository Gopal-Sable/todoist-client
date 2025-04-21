import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTasks } from "../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../store/taskSlice";
import { TaskType } from "../utils/types";
import { RootState } from "../store/store";
import SingleTask from "../Components/SingleTask";
import AddProject from "../Components/AddButton";
import TaskModal from "../Components/TaskModal";

const ProjectPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { id } = useParams();
    const tasks = useSelector((store: RootState) => store.tasks);
    const dispatch = useDispatch();
    const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            if (id) {
                const data: TaskType[] = await getTasks(id);
                dispatch(setTasks(data));
            }
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
        <div className="flex flex-wrap mx-auto">
            <TaskModal />

            <AddProject name="Task" />
            {isLoading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                tasks.map((task) => {
                    return <SingleTask key={task.id} {...task} />;
                })
            )}
        </div>
    );
};

export default ProjectPage;
