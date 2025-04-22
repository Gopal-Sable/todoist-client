import { useDispatch } from "react-redux";
import {
    resetModalProject,
    resetModalTask,
    toggleModal,
    toggleTaskModal,
} from "../store/appConfigSlice";
import { MdAdd } from "react-icons/md";

type props = {
    name: string;
};
const AddButton = ({ name }: props) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        if (name === "Task") {
            dispatch(resetModalTask());
            dispatch(toggleTaskModal());
        } else {
            dispatch(resetModalProject());
            dispatch(toggleModal());
        }
    };
    return (
        <button
            onClick={handleClick}
            className="btn btn-sm btn-ghost text-white hover:bg-zinc-800"
        >
            <MdAdd className="text-lg" />
            <span className="text-red-500">{name === "Task" ? "Add Task" : ""}</span>
        </button>
    );
};

export default AddButton;
