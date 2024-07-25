import type { TYPE } from '~/assets/js/enum';
import type { responseModel, ElectionModel } from '~/models/data/ElectionModel';
import { createError } from 'nuxt/app';
import { FetchError } from "ofetch"
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
const PARTY_COLOR = 'https://db.cec.gov.tw/static/webs/configs/party_colors.json';

type reqParam = {
    id: string,
    type: TYPE,
    code: string
}

const getData = async (url: string) => {
    try {
        const response = await $fetch(url, { responseType: 'json' });
        return { data: response };
    } catch (error) {
        const FetchError = error as FetchError;
        if (FetchError.response && FetchError.response.status === 404) {
            throw showError({ statusCode: 404, statusMessage: 'Page Not Found' })
            // navigateTo('/404', { redirectCode: 404 })
        } else {
            throw showError({ statusCode: FetchError.response?.status, statusMessage: FetchError.message })
        }
    }
}

export const getElectionsData = async(): Promise<responseModel> =>  {
    const result: Promise<responseModel> = getData(ELECTION_LIST_URL);
    return result;
}

export const getColorData = async(): Promise<responseModel> =>  {
    const result: Promise<responseModel> = getData(PARTY_COLOR);
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
