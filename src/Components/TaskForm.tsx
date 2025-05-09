import { useState } from "react";
import {
    MdOutlineDateRange,
    MdPriorityHigh,
    MdNotificationsNone,
} from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { addTaskAPI, updateTaskAPI } from "../utils/apiCalls";
import { useParams } from "react-router";
import { addTask, updateTask } from "../store/taskSlice";
import { TaskType } from "../utils/types";
import { useDispatch } from "react-redux";
type Props = {
    handleClose: () => void;
    task?: TaskType;
};
const TaskForm = ({ handleClose, task }: Props) => {
    const [taskName, setTaskName] = useState(task?.content ?? "");
    const [taskDescription, setTaskDescription] = useState(
        task?.description ?? ""
    );
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleCancel = () => {
        setTaskName("");
        setTaskDescription("");
        handleClose();
    };

    const handleSubmit = async () => {
        if (task?.id) {
            await updateTaskAPI({
                id: task.id,
                content: taskName,
                description: taskDescription,
                project_id: Number(id),
                due_date: "2025-12-25",
            });
            dispatch(
                updateTask({
                    id: Number(task.id),
                    content: taskName,
                    description: taskDescription,
                    project_id: Number(id),
                    due_date: "2025-12-25",
                })
            );
        } else {
            const data = await addTaskAPI({
                content: taskName,
                description: taskDescription,
                project_id: Number(id),
                due_date: "2025-12-25",
            });
            dispatch(addTask(data as TaskType));
        }
        handleCancel();
    };
    return (
        <div className="bg-[#1e1e1e] border border-gray-600 p-4 mt-4 rounded-md w-full max-w-xl">
            <input
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-md font-medium mb-1"
                placeholder="Task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <textarea
                className="w-full bg-transparent outline-none text-sm text-gray-300 resize-none placeholder-gray-500"
                rows={2}
                placeholder="Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />

            {/* <div className="flex items-center gap-3 text-sm text-white mt-3 mb-2">
                <button className="hover:bg-gray-700 px-2 py-1 rounded-md flex items-center gap-1">
                    <MdOutlineDateRange /> Date
                </button>
                <button className="hover:bg-gray-700 px-2 py-1 rounded-md flex items-center gap-1">
                    <MdPriorityHigh /> Priority
                </button>
                <button className="hover:bg-gray-700 px-2 py-1 rounded-md flex items-center gap-1">
                    <MdNotificationsNone /> Reminders
                </button>
                <button className="hover:bg-gray-700 px-2 py-1 rounded-md flex items-center gap-1">
                    <FiMoreHorizontal />
                </button>
            </div> */}

            <div className="flex justify-end items-center">
                <div className="flex gap-2">
                    <button
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded text-sm"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-700 hover:bg-red-600 px-4 py-1 rounded text-sm text-white"
                        onClick={handleSubmit}
                    >
                        {task?.id ? "Update Task" : "Add Task"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
