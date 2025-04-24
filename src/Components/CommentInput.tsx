import React, { useState } from "react";
import { addComment, updateComment } from "../store/commentSlice";
import { sendCommentAPI, updateCommentAPI } from "../utils/apiCalls";
import { useDispatch } from "react-redux";
import { Comment, TaskType } from "../utils/types";

const CommentInput = ({
    task,
    comment,
}: {
    task: TaskType;
    comment?: Comment;
}) => {
    const dispatch = useDispatch();

    const [inputComment, setInputComment] = useState(comment?.content ?? "");
    const sendComment = async () => {
        if (comment?.id) {
            const data = await updateCommentAPI(comment.id, inputComment);
            dispatch(updateComment({ content: inputComment, id: comment.id }));
        } else {
            const data = await sendCommentAPI({
                content: inputComment,
                task_id: task.id,
            });
            dispatch(addComment(data));
        }
    };
    return (
        <div className="border border-gray-700 rounded-lg p-3">
            <textarea
                value={inputComment}
                onChange={(e) => {
                    setInputComment(e.target.value);
                }}
                placeholder="Comment"
                className="w-full bg-transparent focus:outline-none text-sm text-gray-200 resize-none"
                rows={3}
            />
            <div className="flex justify-end mt-2">
                <div className="flex items-center gap-2">
                    <button className="btn btn-sm btn-ghost">Cancel</button>
                    <button
                        className="btn btn-sm btn-error text-white"
                        onClick={sendComment}
                    >
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentInput;
