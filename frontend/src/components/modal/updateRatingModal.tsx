import { Dialog, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import updateRating from '@/libs/updateRating'
import { useState } from 'react';

interface Props {
    id: string,
    open: boolean,
    onClose: () => void;
    initialRatingData: Rating | null;
}

interface Rating {
    serviceRating: number;
    transportRating: number;
    priceRating: number;
    hygieneRating: number;
    comment: string;
}

function UpdateRatingModal({ id, open, onClose, initialRatingData }: Props) {
    const [formValues, setFormValues] = useState<Rating>({
        serviceRating: initialRatingData ? initialRatingData.serviceRating : 0,
        transportRating: initialRatingData ? initialRatingData.transportRating : 0,
        priceRating: initialRatingData ? initialRatingData.priceRating : 0,
        hygieneRating: initialRatingData ? initialRatingData.hygieneRating : 0,
        comment: initialRatingData ? initialRatingData.comment : '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateRating(id, formValues)
            onClose()
        } catch (error) {
            console.error('Failed to update rating:', error);
            window.alert('Failed to update rating. Please try again.')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: name === 'comment' ? value : parseFloat(value)
        }));
    }

    const [isCommentFocused, setIsCommentFocused] = useState(false);

    const handleCommentFocus = () => {
        setIsCommentFocused(true);
    };

    const handleCommentBlur = () => {
        setIsCommentFocused(false);
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth>

            <DialogContent className='h-3/5' >
            <div className="flex flex-col items-center justify-center ">
                    <div className='pt-5'>
                        <h2 className='text-center font-semibold text-2xl'>Update Rating</h2>
                    </div>
                    <div className='bg-zinc-300 w-6/12 rounded-md mt-2 py-1'>
                        <p className='text-center text-white'>ID: {id}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} id='updateForm' className='flex flex-col gap-4'>
                <div className="flex flex-col">
                    <label htmlFor="serviceRating">Service</label>
                    <TextField
                        fullWidth
                        id="serviceRating"
                        variant="outlined"
                        type="number"
                        name="serviceRating"
                        value={formValues.serviceRating}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="transportRating">Transportation</label>
                    <TextField
                        fullWidth
                        id="transportRating"
                        variant="outlined"
                        type="number"
                        name="transportRating"
                        value={formValues.transportRating}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="priceRating">Price</label>
                    <TextField
                        fullWidth
                        id="priceRating"
                        variant="outlined"
                        type="number"
                        name="priceRating"
                        value={formValues.priceRating}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="hygieneRating">Hygiene</label>
                    <TextField
                        fullWidth
                        id="hygieneRating"
                        variant="outlined"
                        type="number"
                        name="hygieneRating"
                        value={formValues.hygieneRating}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
            <label htmlFor="comment">Comment</label>
            <TextField
                fullWidth
                id="comment"
                variant="outlined"
                multiline={isCommentFocused}
                rows={isCommentFocused ? 4 : 1} 
                name="comment"
                value={formValues.comment}
                onChange={handleChange}
                onFocus={handleCommentFocus} 
                onBlur={handleCommentBlur}   
            />
        </div>
            </form>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='error'>Cancel</Button>
                <Button color='success' type='submit' form='updateForm'>Update</Button>
            </DialogActions>
        </Dialog>
  )
}

export default UpdateRatingModal;
