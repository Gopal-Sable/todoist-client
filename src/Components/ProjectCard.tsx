import {
    MdDelete,
    // MdOutlineFavorite,
    // MdOutlineFavoriteBorder,
} from "react-icons/md";
import { Project } from "../utils/types";
import { useNavigate } from "react-router";
import React from "react";
import { deleteProject } from "../store/projectSlice";
import { useDispatch } from "react-redux";
import { deleteProjectAPI } from "../utils/apiCalls";
import { setModalProject, toggleModal } from "../store/appConfigSlice";

const ProjectCard = ({ id, name, is_favorite, color, user_id }: Project) => {
    const project = { id, name, is_favorite, color, user_id };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            deleteProjectAPI(Number(id));
            dispatch(deleteProject(Number(id)));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            id={String(id)}
            // style={{ backgroundColor: color }}
            className={`card card-border bg-accent opacity-90  m-3 w-96 cursor-pointer hover:opacity-95 active:opacity-100`}
            onClick={() => {
                console.log("clicked project card");

                navigate(`/project/${id}`);
            }}
        >
            <div className="card-body">
                <div
                    className="card-actions justify-center items-center text-center"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setModalProject(project));
                        dispatch(toggleModal());
                    }}
                >
                    {name}
                    <span className="z-50" onClick={handleDelete}>
                        <MdDelete className="text-3xl" />
                    </span>
                </div>
            </div>
        </div>
    );
};
export default ProjectCard;
