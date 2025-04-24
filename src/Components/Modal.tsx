import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleModal } from "../store/appConfigSlice";
import { addProjectAPI, updateProjectAPI } from "../utils/apiCalls";
import { Project } from "../utils/types";
import { addProject, updateProject } from "../store/projectSlice";
import { FaChevronDown } from "react-icons/fa";

const COLORS = [
    { name: "Blue", hex: "#007aff" },
    { name: "Grape", hex: "#af52de" },
    { name: "Violet", hex: "#5856d6" },
    { name: "Lavender", hex: "#c644fc" },
    { name: "Magenta", hex: "#ff2d55" },
    { name: "Salmon", hex: "#ff3b30" },
    { name: "Charcoal", hex: "#484848" },
    { name: "Grey", hex: "#8e8e93" },
    { name: "Taupe", hex: "#d2b48c" },
];

const ProjectModal: FC = () => {
    const dispatch = useDispatch();
    const { isModalOpen, projectModalData } = useSelector(
        (state: RootState) => state.appConfig
    );

    const [formData, setFormData] = useState<Project>(projectModalData);
    const [selectedColor, setSelectedColor] = useState(
        formData.color || COLORS[0].hex
    );
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (projectModalData) {
            setFormData(projectModalData);
            setSelectedColor(projectModalData.color || COLORS[0].name);
        }
    }, [projectModalData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleColorChange = (colorName: string, colorValue: string) => {
        setSelectedColor(colorName);
        setFormData((prev) => ({ ...prev, color: colorValue }));
        setDropdownOpen(false);
    };

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
            console.error("Error saving project:", error);
        }
    };

    const selectedColorObj = COLORS.find((c) => c.name === selectedColor);

    return (
        <>
            <input
                type="checkbox"
                className="modal-toggle"
                checked={isModalOpen}
                readOnly
            />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box dark:bg-neutral-900 text-white p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-4">Add project</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Project name"
                                value={formData.name}
                                onChange={handleChange}
                                maxLength={120}
                                className="input input-bordered w-full dark:bg-neutral-800 dark:text-white"
                                required
                            />
                            <small className="text-xs text-right block mt-1 text-gray-400">
                                {formData.name.length}/120
                            </small>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-semibold">
                                Color
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full px-4 py-2 bg-neutral-800 rounded-lg text-left cursor-pointer hover:bg-base-300"
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                >
                                    <div className="flex items-center">
                                        <span
                                            className="w-3 h-3 rounded-full mr-2"
                                            style={{
                                                backgroundColor:
                                                    selectedColorObj?.hex,
                                            }}
                                        />
                                        {selectedColor}
                                    </div>
                                    <FaChevronDown className="text-xs ml-2" />
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute z-10 mt-1 w-full bg-neutral-800 rounded-lg shadow max-h-48 overflow-y-auto">
                                        {COLORS.map((color) => (
                                            <div
                                                key={color.name}
                                                className={`flex items-center p-2 rounded cursor-pointer hover:bg-base-300 ${
                                                    selectedColor === color.name
                                                        ? "bg-base-300"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleColorChange(
                                                        color.name,
                                                        color.hex
                                                    )
                                                }
                                            >
                                                <span
                                                    className="w-3 h-3 rounded-full mr-2"
                                                    style={{
                                                        backgroundColor:
                                                            color.hex,
                                                    }}
                                                />
                                                {color.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                            <label className="text-sm font-semibold">
                                Add to favorites
                            </label>
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={Boolean(formData.is_favorite)}
                                onChange={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        is_favorite: prev.is_favorite ? 0 : 1,
                                    }))
                                }
                            />
                        </div>

                        <div className="modal-action mt-6">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => dispatch(toggleModal())}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProjectModal;
