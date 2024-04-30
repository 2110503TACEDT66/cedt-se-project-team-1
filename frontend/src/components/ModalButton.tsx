"use client"

import { useState, createContext, useContext } from "react"
import { Modal } from "@mui/material";

const ModalContext = createContext({ closeModal: () => {} })

export const useModal = () => useContext(ModalContext)

export default function ModalButton({ text, children,color }: { text:string, children: React.ReactNode,color:string }) {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <button className={`rounded-md bg-${color}-600 hover:bg-${color}-800 transition px-3 py-1 text-white shadow-sm relative mt-10`} onClick={(e) => {e.preventDefault(); handleOpen()}}>{text}</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex justify-center items-center rounded-xl"
            >
                <ModalContext.Provider value={{closeModal: handleClose}}>
                    {children as React.ReactElement}
                </ModalContext.Provider>
            </Modal>
        </div>
    )
}