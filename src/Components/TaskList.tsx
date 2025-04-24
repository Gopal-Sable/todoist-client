import { useEffect, useState } from "react";
import { TaskType } from "../utils/types";
import { getTasks } from "../utils/apiCalls";
import { setTasks } from "../store/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../store/store";

import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const TaskList: React.FC<{ projectTitle: string }> = ({ projectTitle }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
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
    }, [id]);

    return (
        <div className="p-6 text-white w-full ">
            <h2 className="text-xl font-bold mb-4">{projectTitle}</h2>
            {isError && (
                <h1 className="text-red-500">Something went wrong!!</h1>
            )}
            {isLoading ? (
                "Loading..."
            ) : (
                <ul className="space-y-2">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </ul>
            )}

            {/* Add Task Button */}
            {!showAddForm && (
                <button
                    onClick={() => setShowAddForm(true)}
                    className="text-red-500 hover:underline mt-6 text-sm"
                >
                    + Add task
                </button>
            )}

            {/* Expanded Task Form */}
            {showAddForm && (
                <TaskForm handleClose={() => setShowAddForm(false)} />
            )}
        </div>
    );
};

export default TaskList;
