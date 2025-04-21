import { MdDelete } from "react-icons/md";
import { TaskType } from "../utils/types";
import { useDispatch } from "react-redux";
import { deleteTaskAPI } from "../utils/apiCalls";
import { deleteTask } from "../store/taskSlice";
import { setModalTask, toggleTaskModal } from "../store/appConfigSlice";

const SingleTask = ({
    id,
    content,
    created_at,
    description,
    due_date,
    is_completed,
    project_id,
}: TaskType) => {
    const task: TaskType = {
        id,
        content,
        created_at,
        description,
        due_date,
        is_completed,
        project_id,
    };
    const dispatch = useDispatch();

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await deleteTaskAPI(Number(id));
            dispatch(deleteTask(Number(id)));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            id={String(id)}
            onClick={() => {
                dispatch(setModalTask(task));
                dispatch(toggleTaskModal());
            }}
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
