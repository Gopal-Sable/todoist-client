import React, { useState, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleModal } from "../store/appConfigSlice";
import { addProjectAPI, updateProjectAPI } from "../utils/apiCalls";
import { Project } from "../utils/types";
import { addProject, updateProject } from "../store/projectSlice";

const ProjectModal: FC = () => {
    const dispatch = useDispatch();
    const { isModalOpen, projectModalData } = useSelector(
        (state: RootState) => state.appConfig
    );
    const [formData, setFormData] = useState<Project>(projectModalData);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "is_favorite" ? Number(value) : value,
        }));
    };

    useEffect(() => {
        if (projectModalData) {
            setFormData(projectModalData);
        }
    }, [projectModalData]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (Number(formData.id) > 0) {
                await updateProjectAPI(formData);
                dispatch(updateProject(formData));
            } else {
                const data = await addProjectAPI(formData);
                dispatch(addProject(data));
            }
            dispatch(toggleModal());
        } catch (error) {
            console.error("Failed to save project:", error);
        }
    };

    return (
        <>
            <input
                type="checkbox"
                className="modal-toggle"
                checked={isModalOpen}
                readOnly
            />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Project Form</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">Color</label>
                            <input
                                type="color"
                                name="color"
                                className="input w-16 p-0 h-10"
                                value={formData.color}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">Favorite</label>
                            <select
                                name="is_favorite"
                                className="select select-bordered"
                                value={formData.is_favorite}
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
                                onClick={() => dispatch(toggleModal())}
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

export default ProjectModal;
