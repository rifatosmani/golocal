import { Media } from "./media.model";

export interface Product {
    productId: number;
    name: string;
    description: string;
    siteId: number;
    categoryId: number;
    price: number;
    addDate: string;
    modDate: string;
    status: number;
    media: Media[];
  }