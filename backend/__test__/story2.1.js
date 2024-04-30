require("dotenv").config();
const mongoose = require('mongoose');
const membership = require('../controllers/membership');

describe('Membership Controller', () => {
    const user = {
        id: "660057042718f9bc4a5502ad",
        role: "user"
    }
    const admin = {
        id: "66006ded286c4fde4c53674c",
        role: "admin"
    }
    let addedMembershipId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    })

    it("test user get Memberships", async () => {
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

    it("test admin get Memberships by massageShopId", async () => {
        const req = {
            user: admin,
            params: {
                massageShopId: "6630b328550a6ff372555be3"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMemberships = await membership.getMemberships(req, res);
        expect(res.status.mock.calls[0][0]).toBe(200)
    })

    it("test admin get Memberships", async () => {
        const req = {
            user: admin,
            params: {}
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMemberships = await membership.getMemberships(req, res);
        expect(res.status.mock.calls[0][0]).toBe(200)
    })

    it("test admin get Memberships by unknow massageShopId", async () => {
        const req = {
            user: {},
            params: {
                massageShopId: "111111"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMemberships = await membership.getMemberships(req, res);
        expect(res.status.mock.calls[0][0]).toBe(500)
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

    it("test unkown user join membership", async () => {
        const massageShop = "6630b328550a6ff372555be3";
        const req = {
            // Unknow user
            user: {
                id: "660057042718f9bc4a5502ae",
                role: "user"
            },
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
        expect(resStatus).toBe(404);
        expect(res.json.mock.calls[0][0].message).toBe(`No user with the id of ${req.user.id}`);
    })

    it("test user join membership of unknow massageShop", async () => {
        // Unknow massage shop
        const massageShop = "6630b328550a6ff372555be2";
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
        expect(resStatus).toBe(404);
        expect(res.json.mock.calls[0][0].message).toBe(`No massage shop with the id of ${massageShop}`);
    });

    it("test bad request when user join membership", async () => {
        const req = {}

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const addMembership = await membership.addMembership(req, res);
        const resStatus = res.status.mock.calls[0][0];
        expect(resStatus).toBe(400);
    })

    it("test user get membership", async () => {
        const req = {
            user,
            params: {
                id: addedMembershipId
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMembership = await membership.getMembership(req, res);
        expect(res.status.mock.calls[0][0]).toBe(200)
    })

    it("test user get membership with unknown id", async () => {
        const req = {
            user,
            params: {
                id: "111111"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMembership = await membership.getMembership(req, res);
        expect(res.status.mock.calls[0][0]).toBe(500)
    })

    it("test user update membership", async () => {
        const req = {
            user,
            params: {
                id: addedMembershipId
            },
            body: {}
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMembership = await membership.updateMembership(req, res);
        expect(res.status.mock.calls[0][0]).toBe(200)
    })

    it("test user update membership with unknown id", async () => {
        const req = {
            user,
            params: {
                id: user.id
            },
            body: {}
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMembership = await membership.updateMembership(req, res);
        expect(res.status.mock.calls[0][0]).toBe(404)
    })

    it("test user update membership with error", async () => {
        const req = {
            user,
            params: {
                id: "111111"
            },
            body: {}
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMembership = await membership.updateMembership(req, res);
        expect(res.status.mock.calls[0][0]).toBe(500)
    })

    it("test user delete membership", async () => {
        const req = {
            user,
            params: {
                id: addedMembershipId
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const deleteMembership = await membership.deleteMembership(req, res);
    })

    it("test user get deleted membership", async () => {
        const req = {
            user,
            params: {
                id: addedMembershipId
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const getMembership = await membership.getMembership(req, res);
        expect(res.status.mock.calls[0][0]).toBe(404)
    })

    it("test user delete membership with unknown id", async () => {
        const req = {
            user,
            params: {
                id: user.id
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const deleteMembership = await membership.deleteMembership(req, res);
        expect(res.status.mock.calls[0][0]).toBe(404)
    })

    it("test user delete membership with error", async () => {
        const req = {
            user,
            params: {
                id: "111111"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const deleteMembership = await membership.deleteMembership(req, res);
        expect(res.status.mock.calls[0][0]).toBe(500)
    })

    afterAll(async () => {
        await mongoose.disconnect();
    })
})