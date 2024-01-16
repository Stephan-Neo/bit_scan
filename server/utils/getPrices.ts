import moment from "moment/moment";
import axios from "axios";
import {Price} from "~/server/models/Price";

export async function getPrice(range: string, startDate?: string, endDate?: string) {
    let start, end;
    switch(range) {
        case "day":
            start = moment().subtract(1, 'days').toDate();
            end = new Date();
            break;
        case "week":
            start = moment().subtract(1, 'weeks').toDate();
            end = new Date();
            break;
        case "month":
            start = moment().subtract(1, 'months').toDate();
            end = new Date();
            break;
        case "year":
            start = moment().subtract(1, 'years').toDate();
            end = new Date();
            break;
        case "custom":
            if(!startDate || !endDate) {
                throw new Error("Custom date range requires a start and end date");
            }
            start = new Date(startDate);
            end = new Date(endDate);
            break;
        default:
            throw new Error("Invalid range");
    }

    try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');

        const price = response.data.bpi.USD.rate;

        await Price.create({
            timestamp: new Date(),
            price: price
        });

        const data = await Price.find({
            timestamp: {
                $gte: start,
                $lte: end
            }
        }).sort({timestamp: 'asc'});

        console.log('Price has been saved');
        return data;
    } catch(error) {
        console.error(error);
    }
}