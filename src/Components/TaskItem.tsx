import { useDispatch } from "react-redux";
import { updateTaskAPI } from "../utils/apiCalls";
import { TaskType } from "../utils/types";
import { updateTask } from "../store/taskSlice";
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
    return (
        <>
            <li
                key={task.id}
                className="flex flex-col gap-1 hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
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
                        open
                    </label>
                </div>
                {task.description && (
                    <p className="text-sm text-gray-400 ml-6">
                        {task.description}
                    </p>
                )}
            </li>
            {showAddForm && (
                <TaskForm handleClose={() => setShowAddForm(false)} />
            )}
        </>
    );
};

export default TaskItem;
