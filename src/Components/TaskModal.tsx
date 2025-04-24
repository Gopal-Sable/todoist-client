// components/TaskModal.tsx
import React, { useEffect, useState } from "react";
import {
    MdClose,
    MdExpandMore,
    MdOutlineAdd,
    MdLock,
    MdOutlineFlag,
} from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import TaskForm from "./TaskForm";
import { ApiResponse, TaskType, Comment } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
    deleteCommentAPI,
    getComments,
    sendCommentAPI,
} from "../utils/apiCalls";
import { addComment, deleteComment, setComments } from "../store/commentSlice";
import CommentInput from "./CommentInput";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    task: TaskType;
};

const TaskModal: React.FC<Props> = ({ isOpen, onClose, task }) => {
    if (!isOpen) return null;

    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    // const { id } = useParams();
    const comments = useSelector((store: RootState) => store.comment);
    const dispatch = useDispatch();
    const fetchData = async () => {
        // setIsLoading(true);
        // setIsError(false);
        try {
            const data: ApiResponse<Comment[], "comments"> = await getComments(
                task.id
            );
            dispatch(setComments(data));
        } catch (error) {
            // setIsError(true);
        }
        // setIsLoading(false);
    };
    // const sendComment = async () => {
    //     const data = await sendCommentAPI({
    //         content: inputComment,
    //         task_id: task.id,
    //     });
    //     dispatch(addComment(data));
    // };

    const handleDelete = async (id: number) => {
        await deleteCommentAPI(id);
        dispatch(deleteComment(id));
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col md:flex-row relative">
                {/* Header */}
                <div className="absolute top-4 right-4">
                    <button onClick={onClose}>
                        <MdClose className="text-xl" />
                    </button>
                </div>

                {/* Left Content */}
                <div className="flex-1 p-6 overflow-auto">
                    <h2 className="text-sm text-gray-400 font-medium mb-4">
                        Project
                    </h2>
                    {!showAddForm ? (
                        <div
                            className="mb-2"
                            onClick={() => setShowAddForm(true)}
                        >
                            <input
                                type="text"
                                placeholder="Task title"
                                className="bg-transparent text-xl font-semibold focus:outline-none w-full"
                                value={task.content}
                                onChange={() => {}}
                            />
                            <p className="text-gray-500 text-sm ml-1 mt-1">
                                {task.description}
                            </p>
                        </div>
                    ) : (
                        <TaskForm
                            handleClose={() => setShowAddForm(false)}
                            task={task}
                        />
                    )}
                    {/* Comments */}
                    <details open>
                        <summary className="text-gray-300 font-semibold text-sm mb-2 cursor-pointer">
                            Comments{" "}
                            <span className="text-gray-400">
                                ({comments.totalRecord})
                            </span>
                        </summary>
                        <div className="space-y-2 mb-4">
                            {comments.comments.map((comment) => (
                                <div key={comment.id}>
                                    <div className="text-sm font-semibold text-white">
                                        Gopal S.{" "}
                                        <span className="text-gray-400 text-xs ml-1">
                                            {comment.posted_at}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        {comment.content}
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleDelete(Number(comment.id));
                                        }}
                                    >
                                        delete
                                    </div>

                                    <div>
                                        <CommentInput
                                            task={task}
                                            comment={comment}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </details>

                    {/* Comment Input */}
                    <CommentInput task={task} />
                </div>

                {/* Right Sidebar */}
                <div className="w-full md:w-64 bg-base-200 border-l border-base-300 p-4 space-y-4">
                    <div>
                        <div className="text-xs text-gray-400 mb-1">Date</div>
                        <button className="btn btn-xs btn-ghost text-gray-400 w-full justify-start">
                            <MdOutlineAdd className="mr-2" /> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
