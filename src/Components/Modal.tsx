import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleModal } from "../store/appConfigSlice";
import { addProjectAPI } from "../utils/apiCalls";
import { Project } from "../utils/types";
import { addProject } from "../store/projectSlice";

interface ModalProps {
    initialData?: Partial<Project>;
}

const ProjectModal: React.FC<ModalProps> = ({ initialData = {} }) => {
    const [formData, setFormData] = useState<Partial<Project>>({
        id: initialData.id ?? 0,
        name: initialData.name ?? "",
        color: initialData.color ?? "#000000",
        is_favorite: initialData.is_favorite ?? 0,
    });

    const dispatch = useDispatch();
    const isOpen = useSelector(
        (state: RootState) => state.appConfig.isModalOpen
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "is_favorite" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await addProjectAPI(formData as Project);
            dispatch(addProject(data));
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
                checked={isOpen}
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
