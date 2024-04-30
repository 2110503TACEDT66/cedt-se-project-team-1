require("dotenv").config();
const mongoose = require('mongoose');
const membership = require('../controllers/membership');

describe('Membership Controller', () => {
    const user = {
        id: "660057042718f9bc4a5502ad",
        role: "user"
    }
    let addedMembershipId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    })

    it("test getMemberships", async () => {
        const req = {
            user
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMemberships = await membership.getMemberships(req, res);
        expect(res.status.mock.calls[0][0]).toBe(200)
    })

    it("test user join membership", async () => {
        const massageShop = "6630b328550a6ff372555be3";
        const req = {
            user,
            params: {
                massageShopId: massageShop
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const addMembership = await membership.addMembership(req, res);
        const resStatus = res.status.mock.calls[0][0];
        expect(resStatus).toBe(201);

        addedMembershipId = res.json.mock.calls[0][0].data._id;
    })

    it("test user join membership twice", async () => {
        const massageShop = "6630b328550a6ff372555be3";
        const req = {
            user,
            params: {
                massageShopId: massageShop
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const addMembership = await membership.addMembership(req, res);
        const resStatus = res.status.mock.calls[0][0];
        expect(resStatus).toBe(400);
    });

    afterAll(async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const deleteMembership = await membership.deleteMembership({ user, params: { id: addedMembershipId } }, res);

        await mongoose.disconnect();
    })
})