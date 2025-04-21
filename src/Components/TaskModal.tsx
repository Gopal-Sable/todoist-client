import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleTaskModal } from "../store/appConfigSlice";
import { addTaskAPI, updateTaskAPI } from "../utils/apiCalls";
import { TaskType } from "../utils/types";
import { addTask, updateTask } from "../store/taskSlice";
import { useParams } from "react-router";

const TaskModal: React.FC = () => {
    const { id } = useParams();
    const task = useSelector(
        (store: RootState) => store.appConfig.taskModalData
    );
    console.log(task);

    const [formData, setFormData] = useState<TaskType>(task);

    const dispatch = useDispatch();
    const isOpen = useSelector(
        (state: RootState) => state.appConfig.isTaskModalOpen
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "is_completed" ? Number(value) : value,
        }));
    };
    useEffect(() => {
        if (task) {
            setFormData({ ...task, project_id: Number(id) });
        }
    }, [task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (formData.id && formData.id > 0) {
                await updateTaskAPI(formData as TaskType);
                dispatch(updateTask(formData));
            } else {
                const data = await addTaskAPI(formData as TaskType);
                dispatch(addTask(data));
            }
            dispatch(toggleTaskModal());
        } catch (error) {
            console.error("Failed to save task:", error);
        }
    };

    return (
        <>
            <input
                type="checkbox"
                className="modal-toggle"
                checked={isOpen}
                readOnly
            />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Task Form</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">Task Name</label>
                            <input
                                type="text"
                                name="content"
                                className="input input-bordered"
                                value={formData.content}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">Description</label>
                            <input
                                type="text"
                                name="description"
                                className="input input-bordered"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">Due Date</label>
                            <input
                                type="date"
                                name="due_date"
                                className="input input-bordered"
                                value={formData.due_date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">Completed</label>
                            <select
                                name="is_completed"
                                className="select select-bordered"
                                value={formData.is_completed}
                                onChange={handleChange}
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => dispatch(toggleTaskModal())}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TaskModal;
