import { Address } from "./address.model";
import { Media } from "./media.model";

// Site Model
export interface Site {
    siteId: number;
    name: string;
    description: string;
    userId: number;
    categoryId: number;
    status: number;
    address: Address;
    addDate?: string;
    modDate?: string;
    media: Media[];
    extDescription:string;
  }