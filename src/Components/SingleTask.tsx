import { MdDelete } from "react-icons/md";
import { TaskType } from "../utils/types";
import { useDispatch } from "react-redux";
import { deleteTaskAPI } from "../utils/apiCalls";
import { deleteTask } from "../store/taskSlice";
// import { useNavigate } from "react-router";

const SingleTask = ({ id, content }: TaskType) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            deleteTaskAPI(Number(id));
            dispatch(deleteTask(Number(id)));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            id={String(id)}
            // style={{ backgroundColor: color }}
            className={`card card-border bg-accent opacity-90  m-3 w-96 cursor-pointer hover:opacity-95 active:opacity-100`}
        >
            <div className="card-body">
                <div className="card-actions justify-center items-center text-center">
                    {content + id}
                    <span className="z-50" onClick={handleDelete}>
                        <MdDelete className="text-3xl" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SingleTask;
