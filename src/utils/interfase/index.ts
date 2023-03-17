export interface productts{
    brand:string,
    category:category,
    categoryId:string,
    createdAt:string,
    description:string,
    id:number,
    images:Typeimage[],
    price:number,
    title:string,
    updatedAt:string,
    userId:number
}

interface Typeimage {
    id:number,
    url: string
}
interface category {
    id:number,
    name: string
}

export interface Carshop{
    createdAt:string,
    id:number,
    product:productts,
    productId:number,
    quantity:number,
    updatedAt:string,
    userId:string
}