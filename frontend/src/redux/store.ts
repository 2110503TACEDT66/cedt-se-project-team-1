import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import massageSlice from "./features/massageSlice";
import reservationSlice from "./features/reservationSlice";
import ratingSlice from "./features/ratingSlice";
import couponSlice from "./features/couponSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import pointslice from "./features/pointslice";

const persistConfig = {
    key: "rootPersist",
    storage
}

const rootReducer = combineReducers({ massageSlice, reservationSlice, ratingSlice, couponSlice,pointslice })
const reduxPersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: reduxPersistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector