import { Movie } from "./ListItem"

export type SearchType =  Movie &{
    media_type: string;
    name?: string;
}