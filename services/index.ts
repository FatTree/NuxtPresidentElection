import { useAsyncData } from "nuxt/app";

const ELECTION_LIST_URL = 'https://db.cec.gov.tw/static/elections/list/ELC_P0.json';
const TICKET_URL = 'https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00';
const AREA_URL = 'https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00';
const PROFILE_URL = 'https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00';

const callAPI = async (url: string) => {
    let isPending = false;
    let isError = false;
    let data;
    const result = {isPending, isError, data};
    console.log('request' + url);
    
    try {
        isPending = true;
        result.data = await $fetch(url);
    } catch (error) {
        isError = true;
        result.data = error.message;
    } finally {
        isPending = false;
        console.log(result);
        return result;
    }
}


export const getElectionsList = async () => ( await callAPI(ELECTION_LIST_URL) );

