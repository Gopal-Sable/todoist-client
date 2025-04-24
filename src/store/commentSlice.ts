import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, Comment } from "../utils/types";
const initialState: ApiResponse<Comment[], "comments"> = {
    comments: [],
    totalRecord: 0,
    currPage: 1,
    recordsPerPage: 10,
    pages: 0,
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments: (
            _,
            action: PayloadAction<ApiResponse<Comment[], "comments">>
        ) => {
            return action.payload;
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
            state.totalRecord++
        },
        deleteComment: (state, action: PayloadAction<number>) => {
            state.comments = state.comments.filter(
                (comment) => comment.id !== action.payload
            );
            state.totalRecord--;
        },

        updateComment: (
            state,
            action: PayloadAction<Partial<Comment> & { id: number }>
        ) => {
            const { id, ...changes } = action.payload;
            const comment = state.comments.find((t) => t.id === id);
            if (comment) {
                Object.assign(comment, changes);
            }
        },
    },
});

export const { setComments, addComment, deleteComment, updateComment } =
    commentSlice.actions;
export default commentSlice.reducer;
