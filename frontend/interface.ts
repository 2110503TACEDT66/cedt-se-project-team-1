export interface RegisterJson {
  name: string,
  telephone: string,
  email: string,
  role: string,
  password: string
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  ShopOwner = 'shopOwner'
}

export interface UserProfile {
  success: boolean,
  data: {
    _id: string,
    name: string,
    telephone: string,
    email: string,
    role: Role,
    __v: number,
  }
}

export interface ReservationItem {
  apptDate: string,
  user: string,
  massage: {
    _id: string,
    name: string,
    province: string,
    tel: string,
    picture: string,
    id: string
  },
  _id: string,
  __v: number,
  id: string
}

export interface ReservationJson {
  success: boolean,
  count: number,
  data: ReservationItem[]
}

export interface MassageItem {
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  rating : number,
  tel: string,
  picture: string,
  description: string,
  reservation: ReservationItem[],
  _id: string,
  __v: number,
  id: string,
  hygieneRating:number,
  overallRating:number,
  priceRating:number,
  serviceRating:number,
  transportRating:number,
}

export interface MassageJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: MassageItem[]
}

export interface MassageOne {
  success: boolean,
  data: MassageItem
}

export interface RatingItem{
  serviceRating:number,
  transportRating:number,
  priceRating:number,
  hygieneRating:number,
  overallRating:number,
  comment:string,
  // Add for retrieval of all ratings
  createdAt: string,
  user: string,
  _id: string,
}

export interface RatingJson {
    success: boolean,
    data: RatingItem[]
}