import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReservationItem, ReservationJson } from "../../../interface";
import { store } from "../store";

import getReservations from "@/libs/Authenticate/Reservation/getReservations";
import getReservation from "@/libs/Authenticate/Reservation/getReservation";
import createReservation from "@/libs/Authenticate/Reservation/createReservation";
import updateReservation from "@/libs/Authenticate/Reservation/updateReservation";
import deleteReservation from "@/libs/Authenticate/Reservation/deleteReservation";
import session from "redux-persist/lib/storage/session";

type ReservationState = {
    reservationItems: ReservationItem[]
}

const initialState: ReservationState = {
    reservationItems: []
}

// getReservations().then((res:ReservationJson) => {
//     initialState.reservationItems = res.data
// })

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        setReservationReducer: (state, action: PayloadAction<ReservationItem[]>) => {
            state.reservationItems = action.payload
        },
        addReservationReducer: (state, action: PayloadAction<ReservationItem>) => {
            if (state.reservationItems.length < 3) {      
                createReservation(action.payload).then((res) => {
                    getReservations().then((res:ReservationJson) => {
                        store.dispatch(setReservationReducer(res.data))
                    })
                })
            }
        },
        updateReservationReducer: (state, action: PayloadAction<ReservationItem>) => {
            state.reservationItems = state.reservationItems.map((reservation) => {
                if (reservation._id === action.payload.id) {
                    updateReservation(reservation._id, action.payload)
                    return action.payload
                }
                return reservation
            })
            getReservations().then((res: ReservationJson) => {
                store.dispatch(setReservationReducer(res.data))
            })
        },
        deleteReservationReducer: (state, action: PayloadAction<string>) => {
            state.reservationItems = state.reservationItems.filter((reservation) => reservation._id !== action.payload)
            deleteReservation(action.payload)
        }
    },
});

export const { setReservationReducer, addReservationReducer, updateReservationReducer, deleteReservationReducer } = reservationSlice.actions

export default reservationSlice.reducer

// Fetch data and update initialState
// getReservations().then((res:ReservationJson) => {
//     store.dispatch(setReservationReducer(res.data))
// })
