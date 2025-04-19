import { TaskType } from "../utils/types";

const SingleTask = ({ id, content }: TaskType) => {

    return (
        <div
            id={String(id)}
            // style={{ backgroundColor: color }}
            className={`card card-border bg-accent opacity-90  m-3 w-96 cursor-pointer hover:opacity-95 active:opacity-100`}
        >
            <div className="card-body">
                <div className="card-actions justify-center items-center text-center">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default SingleTask;
