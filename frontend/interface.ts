export interface RegisterJson {
  name: string;
  telephone: string;
  email: string;
  role: string;
  password: string;
}

export interface CustomerCouponJson {
  success: boolean,
  count: number,
  data: CustomerCouponItem[]
  

}
export interface CouponItemOne{
  success: boolean,
  data: CouponItem
}
export interface CouponItem{
  _id: string,
  massageShop: string,
  discount : number,
  coverage : number,
  expireAt : string,
  usableUserType : string,
  point : number,
  __v : number
}

export interface CouponJson {
  success: boolean,
  count: number,
  data: CouponItem[]
}

export interface CustomerCouponItem{
  _id : string,
  coupon : CouponItem,
  user: UserProfile["data"],
  massageItem: MassageItem,
  __v: number,
}

export interface CustomerCouponJson {
  success: boolean,
  count: number,
  data: CustomerCouponItem[]
}


export enum Role {
  User = "user",
  Admin = "admin",
  ShopOwner = "shopOwner",
}

export interface UserProfile {
  success: boolean;
  data: {
    _id: string,
    name: string,
    telephone: string,
    email: string,
    role: Role,
    __v: number,
    point: number
  }
}

export interface ReservationItem {
  apptDate: string;
  user: string;
  massage: {
    _id: string;
    name: string;
    province: string;
    tel: string;
    picture: string;
    id: string;
  };
  price: number;
  _id: string;
  __v: number;
  id: string;
}

export interface ReservationJson {
  success: boolean;
  count: number;
  data: ReservationItem[];
}

export interface MassageItem {
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  description: string;
  reservation: ReservationItem[];
  _id: string;
  __v: number;
  id: string;
  hygieneRating: number;
  overallRating: number;
  priceRating: number;
  serviceRating: number;
  transportRating: number;
  owner: string;
  price: number;
}

export interface MassageJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: MassageItem[];
}

export interface MassageOne {
  success: boolean;
  data: MassageItem;
}

export interface RatingItem {
  serviceRating: number;
  transportRating: number;
  priceRating: number;
  hygieneRating: number;
  overallRating: number;
  comment: string;
  // Add for retrieval of all ratings
  createdAt: string;
  user: string;
  _id: string;
  massageShop: {
    _id: string;
    id: string;
  };
}

export interface RatingUpdateData {
  serviceRating: number;
  transportRating: number;
  priceRating: number;
  hygieneRating: number;
  comment: string;
}

export interface RatingJson {
  success: boolean;
  data: RatingItem[];
}


export interface MembershipItem {
  _id: string;
  user: string;
  massageShop: string;
  startAt: string;
  expireAt: string;
}

export interface MembershipJson {
  success: boolean;
  data: MembershipItem[];
}
