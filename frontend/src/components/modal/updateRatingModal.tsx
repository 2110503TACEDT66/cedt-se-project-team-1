import { Dialog, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import updateRating from '@/libs/Rating/updateRating'
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

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
             <div className="flex flex-col items-center justify-center">
                    <div className='pt-5'>
                        <h2 className='text-center font-semibold text-2xl'>Update Rating</h2>
                    </div>
                    <div className='bg-zinc-300 w-6/12 rounded-md mt-2 py-1'>
                        <p className='text-center text-white'>ID: {id}</p>
                    </div>
                </div>
            <DialogContent className='gap-y-4'>
                <form onSubmit={handleSubmit} id='updateForm'>
                    <TextField
                        fullWidth
                        label="Service"
                        margin='dense'
                        variant="outlined"
                        type="number"
                        name="serviceRating"
                        value={formValues.serviceRating}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin='dense'
                        label="Transportation"
                        variant="outlined"
                        type="number"
                        name="transportRating"
                        value={formValues.transportRating}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin='dense'
                        label="Price"
                        variant="outlined"
                        type="number"
                        name="priceRating"
                        value={formValues.priceRating}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin='dense'
                        label="Hygiene"
                        variant="outlined"
                        type="number"
                        name="hygieneRating"
                        value={formValues.hygieneRating}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin='dense'
                        label="Comment"
                        variant="outlined"
                        type="string"
                        name="comment"
                        value={formValues.comment}
                        onChange={handleChange}
                    />
                    
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
