import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./auth/authSlice"
import blogReducer from './blog/blogSlice'


// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist these slices
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);