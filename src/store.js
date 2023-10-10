import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import appReducer from "./reducers/app";
import themeReducer from "./reducers/theme";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
};

const rootReducer = combineReducers({
  app: appReducer,
  theme: themeReducer,
});

export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
