import { config } from "../config/constant";

export const totalPages = (length) => {
    return Math.ceil(length/config.PAGE_SIZE);
}