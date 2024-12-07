export interface MessageResponse {
  message: string;
}

export interface ICategory {
  _id?: string;
  name?: string;
  products?: IProduct[];
}

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  image?: string;
  price: number;
  stock: number;
  categories: ICategory[];
}

export interface IProductsResponse extends MessageResponse {
  products: IProduct[];
}

export interface IProductResponse extends MessageResponse {
  product: IProduct;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
  shippingCost: number;
  tax: number;
  subtotal: number;
  totalPrice: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration extends ILogin {
  username: string;
  name: string;
  image: string;
  address: string;
}

export interface IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
  image: string;
  address: string;
  role: string;
  createdAt?: Date;
}

export interface IAuth extends MessageResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse extends IAuth {
  user: IUser;
}

export interface IAuthStorage extends IAuth {
  user: IUser | null;
}
