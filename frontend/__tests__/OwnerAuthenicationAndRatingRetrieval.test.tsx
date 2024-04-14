import getMassagesRating from "@/libs/Rating/getMassagesRating";
import MassageRating from "@/components/MassageRating";
import { render,screen,waitFor } from "@testing-library/react";

describe('getReviews', () => {
    it('should fetch reviews successfully', async () => {
        // fetching from getMassagesRating
        const mid = "6602f1e55275387a7855d32e" // Haven Massage
        const reviews = await getMassagesRating(mid);

        console.log(reviews)

        expect(reviews).toBeDefined();
        expect(reviews).not.toBeNull();
        expect(reviews).not.toBeUndefined();

        // check if the response is a RatingJson structure
        expect(reviews).toHaveProperty("success");
        expect(reviews).toHaveProperty("data"); 
        
    }, 10000); // Increase the timeout value to 10000ms (10 seconds)
});



const mockdata = {
    "success": true,
    "data": [
        {
            "overallRating": 0,
            "_id": "6618f3659c69d0facee3dcc7",
            "serviceRating": 5,
            "transportRating": 4,
            "priceRating": 3,
            "hygieneRating": 2,
            "comment": "นวดเสร็จไปตี๋น้อยต่อ",
            "user": "6618eb04b9ffd9fca47d335e",
            "massageShop": "6602f1e55275387a7855d32e",
            "createdAt": "2024-04-12T08:40:05.135Z",
            "__v": 0
        },
        {
            "overallRating": 0,
            "_id": "661982927b97ba2a3e2b8651",
            "serviceRating": 3,
            "transportRating": 2,
            "priceRating": 4,
            "hygieneRating": 1,
            "comment": "ดีไม่พอขออภัย พอดีอยู่อุทัยไม่ใช่อุเทน",
            "user": "660057042718f9bc4a5502ad",
            "massageShop": "6602f1e55275387a7855d32e",
            "createdAt": "2024-04-12T18:50:58.553Z",
            "__v": 0
        },
        {
            "_id": "661b75accab7c748879d235e",
            "serviceRating": 5,
            "transportRating": 4,
            "priceRating": 5,
            "hygieneRating": 5,
            "overallRating": 0,
            "comment": "ชอบร้านคนสุราษคับ",
            "user": "661901b3b9bd3b19f9780238",
            "massageShop": "6602f1e55275387a7855d32e",
            "createdAt": "2024-04-14T06:20:28.800Z",
            "__v": 0
        }
    ]
}

describe('getMassageRating', () => {
    it('should have correct reviews', async () => {
        const reviews = await MassageRating({ ratingJson: mockdata})

        render(reviews)
        await waitFor(
            ()=>{
                const avgrating = screen.getAllByRole('Rating', { name: 'avg-rating' });
                const ratings = screen.getAllByRole('Rating', { name: 'rating' });
                expect(avgrating.length).toBe(1);
                expect(ratings.length).toBe(4)
                
            }
        )
        
    });
});
