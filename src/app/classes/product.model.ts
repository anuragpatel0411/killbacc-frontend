export class Product{
    _id?: string;
    categories: Category;
    currentRating: number;
    ratings: rating;
    date: Date;
    description: string;
    features: Array<string>;
    imageIcon: Array<string>;
    imageURLs: Array<string>;
    name: string;
    price: number;
    priceNormal: number;
    quantity: number;
    reduction: number;
    seller: string;
}

export class Category{
    category: string;
    subCategory: string;
}

export class rating{
    user: string;
    rating: number;
}