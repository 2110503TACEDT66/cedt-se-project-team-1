import getMassagesRating from "@/libs/Rating/getMassagesRating";

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