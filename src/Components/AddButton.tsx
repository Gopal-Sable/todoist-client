import { IoAdd } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
    resetModalProject,
    resetModalTask,
    toggleModal,
    toggleTaskModal,
} from "../store/appConfigSlice";

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
            className="card card-border bg-gray-600  m-3 w-96 cursor-pointer hover:bg-gray-700 active:bg-gray-600"
            onClick={handleClick}
        >
            <div className="card-body">
                <div className="card-actions justify-center items-center text-center">
                    {false ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        <IoAdd />
                    )}
                    ADD {name}
                </div>
            </div>
        </button>
    );
};

export default AddButton;
