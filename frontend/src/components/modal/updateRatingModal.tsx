"use client";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import updateRating from "@/libs/Rating/updateRating";
import { useState } from "react";
import { RatingItem } from "../../../interface";
import { useAppSelector } from "@/redux/store";
import { store } from "@/redux/store";
import { updateRatingReducer } from "@/redux/features/ratingSlice";

interface Props {
    id: string;
    open: boolean;
    onClose: () => void;
    initialRatingData: RatingItem | null;
}

interface Rating {
    serviceRating: number;
    transportRating: number;
    priceRating: number;
    hygieneRating: number;
    comment: string;
}

function UpdateRatingModal({ id, open, onClose, initialRatingData }: Props) {
    const ratingItems = useAppSelector(
        (state) => state.ratingSlice.ratingItems
    );

    const [formValues, setFormValues] = useState<Rating>({
        serviceRating: initialRatingData ? initialRatingData.serviceRating : 0,
        transportRating: initialRatingData
            ? initialRatingData.transportRating
            : 0,
        priceRating: initialRatingData ? initialRatingData.priceRating : 0,
        hygieneRating: initialRatingData ? initialRatingData.hygieneRating : 0,
        comment: initialRatingData ? initialRatingData.comment : "",
    });

    const [serviceRating, setServiceRating] = useState(
        initialRatingData ? initialRatingData.serviceRating : 0
    );
    const [transportRating, setTransportRating] = useState(
        initialRatingData ? initialRatingData.transportRating : 0
    );
    const [priceRating, setPriceRating] = useState(
        initialRatingData ? initialRatingData.priceRating : 0
    );
    const [hygieneRating, setHygieneRating] = useState(
        initialRatingData ? initialRatingData.hygieneRating : 0
    );
    const [comment, setComment] = useState(
        initialRatingData ? initialRatingData.comment : ""
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const ratingTarget = ratingItems.find(
                (rating) => rating._id === id
            );
            if (ratingTarget) {
                store.dispatch(
                    updateRatingReducer({
                        ...ratingTarget,
                        serviceRating,
                        transportRating,
                        priceRating,
                        hygieneRating,
                        comment,
                    })
                );
            }
            onClose();
        } catch (error) {
            console.error("Failed to update rating:", error);
            window.alert("Failed to update rating. Please try again.");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: name === "comment" ? value : parseFloat(value),
        }));
    };

    const [isCommentFocused, setIsCommentFocused] = useState(false);

    const handleCommentFocus = () => {
        setIsCommentFocused(true);
    };

    const handleCommentBlur = () => {
        setIsCommentFocused(false);
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogContent className="h-3/5">
                <div className="flex flex-col items-center justify-center ">
                    <div className="pt-5">
                        <h2 className="text-center font-semibold text-2xl">
                            Update Rating
                        </h2>
                    </div>
                    <div className="bg-zinc-300 w-6/12 rounded-md mt-2 py-1">
                        <p className="text-center text-white">ID: {id}</p>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    id="updateForm"
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col">
                        <label htmlFor="serviceRating">Service</label>
                        <TextField
                            fullWidth
                            id="serviceRating"
                            variant="outlined"
                            type="number"
                            name="serviceRating"
                            // value={formValues.serviceRating}
                            // onChange={handleChange}
                            value={serviceRating}
                            onChange={(e) =>
                                setServiceRating(parseFloat(e.target.value))
                            }
                        />
                        <TextField
                            fullWidth
                            id="transportRating"
                            variant="outlined"
                            type="number"
                            name="transportRating"
                            // value={formValues.transportRating}
                            // onChange={handleChange}
                            value={transportRating}
                            onChange={(e) =>
                                setTransportRating(parseFloat(e.target.value))
                            }
                        />
                        <TextField
                            fullWidth
                            id="priceRating"
                            variant="outlined"
                            type="number"
                            name="priceRating"
                            // value={formValues.priceRating}
                            // onChange={handleChange}
                            value={priceRating}
                            onChange={(e) =>
                                setPriceRating(parseFloat(e.target.value))
                            }
                        />
                        <TextField
                            fullWidth
                            id="hygieneRating"
                            variant="outlined"
                            type="number"
                            name="hygieneRating"
                            // value={formValues.hygieneRating}
                            // onChange={handleChange}
                            value={hygieneRating}
                            onChange={(e) =>
                                setHygieneRating(parseFloat(e.target.value))
                            }
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Comment"
                            variant="outlined"
                            type="string"
                            name="comment"
                            // value={formValues.comment}
                            // onChange={handleChange}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancel
                </Button>
                <Button color="success" type="submit" form="updateForm">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateRatingModal;
