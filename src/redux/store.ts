// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import yourReducer from "./features/user/user.slice";
import graphReducer from "./features/graph/graph.slice";
import roomReducer from "./features/room/room.slice";
import shapeReducer from "./features/shape/shape.slice";
import nodesReducer from "./features/nodes/nodes.slice";
import nodeEditorReducer from "./features/nodeEditor/nodeEditor.slice";
import outputEditorReducer from "./features/appState/appState.slice";
import authReducer from "./features/auth/authSlice";
import toastReducer from "./features/toast/toast.slice";
const rootReducer = combineReducers({
  user: yourReducer,
  graph: graphReducer,
  roomState: roomReducer,
  shapeState: shapeReducer,
  nodesState: nodesReducer,
  nodeEditorState: nodeEditorReducer,
  outputEditorButtonState: outputEditorReducer,
  auth: authReducer,
  toast: toastReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "user",
    "graph",
    "room",
    "shape",
    "nodesState",
    "nodeEditorState",
    "outputEditorButtonState",
    "roomState",
    "toast",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
