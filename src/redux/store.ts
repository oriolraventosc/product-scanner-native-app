import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./features/productSlice/productSlice";
import { uiActionsReducer } from "./features/uiSlice/uiSlice";
import { userReducer } from "./features/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    productActions: ProductReducer,
    uiActions: uiActionsReducer,
    userActions: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
