require("dotenv").config();
const mongoose = require('mongoose');
const { getCoupons, getCoupon, addCoupon, updateCoupon, deleteCoupon } = require('../controllers/coupon');
const Massage = require('../models/Massage');
const Coupon = require('../models/Coupon');

describe('getCoupons', () => {
  let req, res;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    req = {
      params: {},
      user: { role: '', id: '' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all coupons for a shop owner', async () => {
    req.user.role = 'shopOwner';
    req.user.id = '66195e36bbd0d32fbc0b3b9f';
    const mockMassageShopOwner = [{ id: '66014f1d3ab7a4db54e4f1ab' }];
    const mockCoupons = [
      { id: '662c7fabae6f7a8d911cd473', massageShop: '66014f1d3ab7a4db54e4f1ab' }
    ];

    Massage.find = jest.fn().mockResolvedValue(mockMassageShopOwner);
    Coupon.find = jest.fn().mockResolvedValue(mockCoupons);

    await getCoupons(req, res);

    expect(Massage.find).toHaveBeenCalledWith({ owner: req.user.id });
    expect(Coupon.find).toHaveBeenCalledWith({ massageShop: ['66014f1d3ab7a4db54e4f1ab'] });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCoupons });
  });

  it('should get all coupons for a user', async () => {
    req.user.role = 'user';
    const mockCoupons = [
      { id: '662c7fabae6f7a8d911cd473', massageShop: '66014f1d3ab7a4db54e4f1ab' }
    ];

    Coupon.find = jest.fn().mockResolvedValue(mockCoupons);

    await getCoupons(req, res);

    expect(Coupon.find).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCoupons });
  });

  it('should handle error', async () => {
    req.user.role = 'user';
    Coupon.find = jest.fn().mockRejectedValue(new Error('Database error'));

    await getCoupons(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Internal server error' });
  });

  it('should get coupons by massage shop ID', async () => {
    req.user.role = 'user';
    req.params.massageShopId = '66014f1d3ab7a4db54e4f1ab';
    const mockCoupons = [
      { id: '662c7fabae6f7a8d911cd473', massageShop: '66014f1d3ab7a4db54e4f1ab' }
    ];

    Coupon.find = jest.fn().mockResolvedValue(mockCoupons);

    await getCoupons(req, res);

    expect(Coupon.find).toHaveBeenCalledWith({ massageShop: '66014f1d3ab7a4db54e4f1ab' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCoupons });
  });

  it('should get coupons by massage shop ID error', async () => {
    req = {
      params: {}
    }


    await getCoupons(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Internal server error' });
  });

});

describe('getCoupon', () => {
  let req, res;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    req = {
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a coupon by ID', async () => {
    req.params.id = '662c7fabae6f7a8d911cd473';
    const mockCoupon = { id: '662c7fabae6f7a8d911cd473', massageShop: '66014f1d3ab7a4db54e4f1ab' };

    Coupon.findById = jest.fn().mockResolvedValue(mockCoupon);

    await getCoupon(req, res);

    expect(Coupon.findById).toHaveBeenCalledWith('662c7fabae6f7a8d911cd473');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCoupon });
  });

  it('should handle coupon not found', async () => {
    req.params.id = 'invalid_id';

    Coupon.findById = jest.fn().mockResolvedValue(null);

    await getCoupon(req, res);

    expect(Coupon.findById).toHaveBeenCalledWith('invalid_id');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Coupon not found' });
  });

  it('should handle error', async () => {
    req.params.id = '662c7fabae6f7a8d911cd473';

    Coupon.findById = jest.fn().mockRejectedValue(new Error('Database error'));

    await getCoupon(req, res);

    expect(Coupon.findById).toHaveBeenCalledWith('662c7fabae6f7a8d911cd473');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Internal server error' });
  });
});


describe('addCoupon', () => {
  let req, res;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new coupon', async () => {
    req.params.massageShopId = '66014f1d3ab7a4db54e4f1ab';
    req.body = { discount: 10, coverage: 'Full body', expireAt: new Date() };
    const mockMassageShop = { _id: '66014f1d3ab7a4db54e4f1ab' };

    Massage.findById = jest.fn().mockResolvedValue(mockMassageShop);
    Coupon.create = jest.fn().mockResolvedValue(req.body);

    await addCoupon(req, res);

    expect(Massage.findById).toHaveBeenCalledWith('66014f1d3ab7a4db54e4f1ab');
    expect(Coupon.create).toHaveBeenCalledWith({ ...req.body, massageShop: '66014f1d3ab7a4db54e4f1ab' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: req.body });
  });

  it('should handle missing massage shop', async () => {
    req.params.massageShopId = 'invalid_id';

    Massage.findById = jest.fn().mockResolvedValue(null);

    await addCoupon(req, res);

    expect(Massage.findById).toHaveBeenCalledWith('invalid_id');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'No massageShop with the id of invalid_id' });
  });

  it('should handle missing expire date', async () => {
    req.params.massageShopId = '66014f1d3ab7a4db54e4f1ab';
    req.body = { discount: 10, coverage: 'Full body' };
    const mockMassageShop = { _id: '66014f1d3ab7a4db54e4f1ab' };

    Massage.findById = jest.fn().mockResolvedValue(mockMassageShop);
    Coupon.create = jest.fn().mockResolvedValue(req.body);

    await addCoupon(req, res);

    expect(Massage.findById).toHaveBeenCalledWith('66014f1d3ab7a4db54e4f1ab');
    expect(Coupon.create).toHaveBeenCalledWith({ ...req.body, expireAt: expect.any(Date), massageShop: '66014f1d3ab7a4db54e4f1ab' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: req.body });
  });

  it('should handle error', async () => {
    req.params.massageShopId = '66014f1d3ab7a4db54e4f1ab';

    Massage.findById = jest.fn().mockRejectedValue(new Error('Database error'));

    await addCoupon(req, res);

    expect(Massage.findById).toHaveBeenCalledWith('66014f1d3ab7a4db54e4f1ab');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Database error' });
  });
});

describe('updateCoupon', () => {
  let req, res;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a coupon', async () => {
    req.params.id = '662c7fabae6f7a8d911cd473';
    req.body = { discount: 15 };

    Coupon.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);

    await updateCoupon(req, res);

    expect(Coupon.findByIdAndUpdate).toHaveBeenCalledWith('662c7fabae6f7a8d911cd473', req.body, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: req.body });
  });

  it('should handle coupon not found', async () => {
    req.params.id = 'invalid_id';

    Coupon.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await updateCoupon(req, res);

    expect(Coupon.findByIdAndUpdate).toHaveBeenCalledWith('invalid_id', req.body, { new: true });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Coupon not found' });
  });

  it('should handle error', async () => {
    req.params.id = '662c7fabae6f7a8d911cd473';

    Coupon.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Database error'));

    await updateCoupon(req, res);

    expect(Coupon.findByIdAndUpdate).toHaveBeenCalledWith('662c7fabae6f7a8d911cd473', req.body, { new: true });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Internal server error' });
  });
});

describe('deleteCoupon', () => {
  let req, res;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    req = {
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a coupon', async () => {
    req.params.id = '66310f6f0e8bcdfcc1df95a4';
    console.log(req);

    Coupon.findById = jest.fn().mockResolvedValue({});

    await deleteCoupon(req, res);

    expect(Coupon.findById).toHaveBeenCalledWith('66310f6f0e8bcdfcc1df95a4');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });

  it('should handle coupon not found', async () => {
    req.params.id = 'invalid_id';

    Coupon.findById = jest.fn().mockResolvedValue(null);

    await deleteCoupon(req, res);

    expect(Coupon.findById).toHaveBeenCalledWith('invalid_id');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Coupon not found' });
  });

  it('should handle error', async () => {
    req.params.id = '662c7fabae6f7a8d911cd473';

    Coupon.findById = jest.fn().mockRejectedValue(new Error('Database error'));

    await deleteCoupon(req, res);

    expect(Coupon.findById).toHaveBeenCalledWith('662c7fabae6f7a8d911cd473');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Internal server error' });
  });
});