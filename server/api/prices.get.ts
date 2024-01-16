import { getPrice } from "~/server/utils/getPrices";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const range = query.range
        const startDate = query.startDate
        const endDate = query.endDate
        const prices = await getPrice(`${range}`, `${startDate}`, `${endDate}`);
        return { data: prices }
    } catch (err) {
        return err
    }
})
