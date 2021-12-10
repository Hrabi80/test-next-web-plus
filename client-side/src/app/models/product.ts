import { category } from "./category";

export class product{
    
    id!:number;
    name!:string;
    price!:number;
    description!:string;
    category!: category["id"];
    
}