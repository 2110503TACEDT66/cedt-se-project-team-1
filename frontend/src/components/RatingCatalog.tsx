import dayjs from "dayjs";
import { RatingItem } from "../../interface";
import { Rating } from "@mui/material";

export default function RatingCatalog({ ratings }: { ratings: RatingItem[] }) {
    
    return (
        <div className="bg-white p-[50px] h-[100%] overflow-y-scroll flex flex-col items-center justify-center">
            
            {
                (ratings.length === 0) ? (
                    <h1 className="text-5xl ">No ratings yet</h1>
                ) :
                ratings.map((rating) => {
                    return (
                        <div key={rating._id} className="flex flex-col">
                            <h1 className="font-semibold">{rating.user} Created at {dayjs(rating.createdAt).format('DD-MMM-YYYY')}</h1>
                            <div className='flex justify-between mt-2'>
                                <h1>Service</h1>
                                <Rating value={rating.serviceRating} precision={0.5} readOnly></Rating>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <h1>Transportation</h1>
                                <Rating value={rating.transportRating} precision={0.5} readOnly></Rating>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <h1>Price</h1>
                                <Rating value={rating.priceRating} precision={0.5} readOnly></Rating>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <h1>Hygiene</h1>
                                <Rating value={rating.hygieneRating} precision={0.5} readOnly></Rating>
                            </div>
                            <div className='flex flex-col text-start my-4'>
                                <h1>Comment</h1>
                                <p>{rating.comment}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}