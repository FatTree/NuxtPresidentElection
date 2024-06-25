import { useAsyncData } from "nuxt/app";
import type { ElectionGroupModel, ElectionModel } from '~/models/data/ElectionModel';

const ELECTION_LIST_URL = 'https://db.cec.gov.tw/static/elections/list/ELC_P0.json';
const TICKET_URL = 'https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00';
const AREA_URL = 'https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00';
const PROFILE_URL = 'https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00';

type responseModel = {
    isError: boolean,
    data: any,
}

const getData = async (url: string): Promise<responseModel> => {
    let isError = false;
    const result: responseModel = {isError, data: null};
    console.log('request:', url);
    
    try {
        result.data = await $fetch(url);
    } catch (error) {
        isError = true;
        result.data = error;
    } finally {
        console.log('result:',result);
        return result;
    }
}

export const getElectionsList = async(): Promise<responseModel> =>  {
    const result: Promise<responseModel> = getData(ELECTION_LIST_URL);
    return result;
}

export const getProfileList = async (): Promise<responseModel> =>  {
    const result: Promise<responseModel> = getData(PROFILE_URL);
    return result;
}

export const getTicketList = async (): Promise<responseModel> =>  {
    const result: Promise<responseModel> = getData(TICKET_URL);
    return result;
}

export const getAreaList = async (): Promise<responseModel> =>  {
    const result: Promise<responseModel> = getData(AREA_URL);
    return result;
}
