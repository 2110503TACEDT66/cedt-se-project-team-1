import { Rating } from "@mui/material"
import { RatingJson } from "../../interface"
import ModalButton from "./ModalButton";
import RatingCatalog from "./RatingCatalog";

export default function MassageRating({ ratingJson }: { ratingJson: RatingJson}) {

    const columnsName = ["Service", "Transportation", "Price", "Hygiene"]
    const columnsRating = [0,0,0,0];
    for (let i = 0; i < ratingJson.data.length; i++) {
        // Find average rating for each column
        columnsRating[0] += ratingJson.data[i].serviceRating;
        columnsRating[1] += ratingJson.data[i].transportRating;
        columnsRating[2] += ratingJson.data[i].priceRating;
        columnsRating[3] += ratingJson.data[i].hygieneRating;
    }

    for (let i = 0; i < columnsRating.length; i++) columnsRating[i] /= ratingJson.data.length;

    return (
        <>
            <h1>Overall Rating</h1>
            <div className="bg-white w-[280px] text-center">
                <h1>{isNaN(columnsRating.reduce((a, b) => a + b, 0) / columnsRating.length) ? 0 : (columnsRating.reduce((a, b) => a + b, 0) / columnsRating.length).toPrecision(2)}</h1>
                <Rating
                    name="avg-rating"
                    value={columnsRating.reduce((a, b) => a + b, 0) / columnsRating.length}
                    precision={0.5}
                    readOnly
                />
                <h1>based on {ratingJson.data.length} reviews</h1>
                {
                    columnsRating.map((rating, index) => {
                        return (
                            <div key={index} className="flex">
                                <h1>{columnsName[index]}</h1>
                                <Rating
                                    name="rating"
                                    value={rating}
                                    precision={0.5}
                                    readOnly
                                />
                            </div>
                        )
                    })
                }
                {/* Click to see all reviews (Modal and scroll on x axis) */}
                <ModalButton text="See all reviews" color="green">
                    <RatingCatalog ratings={ratingJson.data}/>
                </ModalButton>
            </div>
        </>
    )

}