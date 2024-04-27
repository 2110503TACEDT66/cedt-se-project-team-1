import getMassagesRating from "@/libs/Rating/getMassagesRating";
import MassageRating from "@/app/(massageinfo)/components/MassageRating";
import { render, screen, waitFor } from "@testing-library/react";

describe('getReviews', () => {
    it('should fetch reviews successfully', async () => {
        // fetching from getMassagesRating
        const mid = "6602f1e55275387a7855d32e" // Haven Massage
        const reviews = await getMassagesRating(mid);

        // console.log(reviews)

        expect(reviews).toBeDefined();
        expect(reviews).not.toBeNull();
        expect(reviews).not.toBeUndefined();

        // check if the response is a RatingJson structure
        expect(reviews).toHaveProperty("success");
        expect(reviews).toHaveProperty("data"); 
        
    }, 10000); // Increase the timeout value to 10000ms (10 seconds)
});

const mockData = {
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

const columnsRating = [0, 0, 0, 0];

for (let i = 0; i < mockData.data.length; i++) {
    // Find average rating for each column
    columnsRating[0] += mockData.data[i].serviceRating;
    columnsRating[1] += mockData.data[i].transportRating;
    columnsRating[2] += mockData.data[i].priceRating;
    columnsRating[3] += mockData.data[i].hygieneRating;
}

for (let i = 0; i < columnsRating.length; i++) columnsRating[i] /= mockData.data.length;

describe('getMassageRating', () => {
    it('should have correct reviews', async () => {
        const reviews = await MassageRating({ ratingJson: mockData})

        render(reviews)
        await waitFor(
            ()=>{
                const avgrating = screen.getByTestId('overall-rating')
                const ratings = screen.queryAllByTestId('rating')
                expect(avgrating.innerHTML).toBe((columnsRating.reduce((a, b) => a + b, 0) / columnsRating.length).toPrecision(2));
                expect(ratings.length).toBe(4)
                
            }
        )
        
    });
});