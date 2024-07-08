import type { responseModel, ElectionModel } from '~/models/data/ElectionModel';
/**
 * https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/D/10_014_00_000_0000.json
 * https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/L/65_000_00_000_0000.json
 * 
 * https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/C/00_000_00_000_0000.json
 * https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/D/63_000_00_000_0000.json
 * https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/C/00_000_00_000_0000.json
 * 
 * https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/D/63_000_00_000_0000.json
 * https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/D/63_000_00_000_0000.json
 * https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/L/63_000_00_000_0000.json
 * 
 * https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/L/63_000_00_000_0000.json
 * https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/L/63_000_00_000_0000.json
 */
const ELECTION_LIST_URL = 'https://db.cec.gov.tw/static/elections/list/ELC_P0.json';
const TICKET_URL = 'https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00';
const AREA_URL = 'https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00';
const PROFILE_URL = 'https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00';
const PARTY_COLOR = 'https://db.cec.gov.tw/static/elections/webs/configs/party_colors.json';

type reqParam = {
    id: string,
    type: string,
    code: string
}

const getData = async (url: string): Promise<responseModel> => {
    const result: responseModel = {data: null};
    try {
        result.data = await $fetch(url);
    } catch (error) {
        result.data = error;
    } finally {
        return result;
    }
}

export const getElectionsData = async(): Promise<responseModel> =>  {
    const result: Promise<responseModel> = getData(ELECTION_LIST_URL);
    return result;
}

export const getColorData = async(): Promise<responseModel> =>  {
    const result: Promise<responseModel> = getData(PARTY_COLOR);
    console.log(result);
    
    return result;
}

export const getProfileData = async (params: reqParam): Promise<responseModel> =>  {
    const { id, type, code } = params;
    const result: Promise<responseModel> = getData(`${PROFILE_URL}/${id}/${type}/${code}.json`);
    return result;
}

export const getTicketData = async (params: reqParam): Promise<responseModel> =>  {
    const { id, type, code } = params;
    const result: Promise<responseModel> = getData(`${TICKET_URL}/${id}/${type}/${code}.json`);
    return result;
}

export const getAreaData = async (params: reqParam): Promise<responseModel> =>  {
    const { id, type, code } = params;
    const result: Promise<responseModel> = getData(`${AREA_URL}/${id}/${type}/${code}.json`);
    return result;
}
