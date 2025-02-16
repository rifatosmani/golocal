import { Media } from "./media.model";

export type Category = {
    categoryId: number;
    name: string;
    description: string;
    addDate: string | null;
    modDate: string | null;
    status: number;
    media:Media[];
  };

export type CategoryTree = Category[];

