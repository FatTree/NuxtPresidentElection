import type { CodeModel, TicketModel } from "../data/ElectionModel";

export type MapViewModel = CodeModel & {
    name: string[],
    path: string,
    party_color: string,
}

// name === party_name

export type tempList = {
    prv_code: string;
    city_code: string;
    area_code: string;
    dept_code: string;
    li_code: string;
    area_name: string;
    party_color: string,
    name?: string[],
    path?: string,
}

export type cityPathModel = {
    name: string[],
    path: string
}

export type TicketGeneratedModel = TicketModel & {
    vice_name: string,
    party_color: string,
}