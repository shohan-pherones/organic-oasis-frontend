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
