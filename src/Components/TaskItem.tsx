import { useDispatch } from "react-redux";
import { deleteTaskAPI, updateTaskAPI } from "../utils/apiCalls";
import { TaskType } from "../utils/types";
import { deleteTask, updateTask } from "../store/taskSlice";
import { useState } from "react";
import TaskForm from "./TaskForm";

const TaskItem = ({ task }: { task: TaskType }) => {
    const dispatch = useDispatch();

    const [showAddForm, setShowAddForm] = useState(false);
    const handleChange = async (id: number, completed: 0 | 1) => {
        const is_completed = completed === 1 ? 0 : 1;
        await updateTaskAPI({ id, is_completed });
        dispatch(updateTask({ id, is_completed }));
    };
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await deleteTaskAPI(Number(task.id));
            dispatch(deleteTask(Number(task.id)));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <li
                key={task.id}
                className="flex flex-col gap-1 border-b max-w-xl px-4 py-2  transition-colors"
            >
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id={`task-${task.id}`}
                        checked={!!task.is_completed}
                        onChange={() =>
                            handleChange(task.id, task.is_completed)
                        }
                    />
                    <label
                        className={`${
                            task.is_completed
                                ? "line-through text-gray-500"
                                : ""
                        }`}
                    >
                        {task.content}
                    </label>
                    <label
                        htmlFor=""
                        onClick={() => setShowAddForm((pre) => !pre)}
                    >
                        Edit
                    </label>
                    <label htmlFor="" onClick={(e) => handleDelete(e)}>
                        delete
                    </label>
                </div>
                {task.description && (
                    <p className="text-sm text-gray-400 ml-6">
                        {task.description}
                    </p>
                )}
            </li>
            {showAddForm && (
                <TaskForm
                    handleClose={() => setShowAddForm(false)}
                    task={task}
                />
            )}
        </>
    );
};

export default TaskItem;
