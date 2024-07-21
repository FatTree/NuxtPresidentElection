/*
 * id:
 * - id...
 * Type:
 * - N: Nation 
 * - C: City
 * - D: District
 * - L: Li
 * Code: 
 * - ${prv_code}_${city_code}_${area_code}_${dept_code}_${li_code}
*/

export type responseModel = {
    data: any,
}

// Code: ${prv_code}_${city_code}_${area_code}_${dept_code}_${li_code}
export type CodeModel = {
    prv_code: string,
    city_code: string,
    area_code: string,
    dept_code: string,
    li_code: string,
}




/**
 * All Presidential Elections List
 * https://db.cec.gov.tw/static/elections/list/ELC_P0.json
 */
export type ElectionModel = {
    theme_id: string;
    theme_group: string;
    type_id: string;
    subject_id: string;
    legislator_type_id: string;
    data_level: string;
    session: number;
    theme_name: string;
    vote_date: string;
    legislator_desc: string;
    has_data: boolean;
    prv_code: string;
    city_code: string;
    area_code: string;
    dept_code: string;
    li_code: string;
    vote_result: unknown;
    data_prof_seq: string[];
    data_tckt_seq: string[];
    ris_prv_code: string;
    ris_city_code: string;
    ris_area_code: string;
    ris_dept_code: string;
    print_order: number;
    area_name: string;
};

export type ElectionGroupModel = [{
    area_name: string;
    theme_items: ElectionModel[];
}]


/**
 * profiles: Vote Detail
 * https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/
 * id: 61b4dda0ebac3332203ef3729a9a0ada
 * type: N
 * 全台灣 總票數細節
 * code: 00_000_00_000_0000.json
 * 
 * type: C (city)
 * 各縣市 總票數細節
 * 61b4dda0ebac3332203ef3729a9a0ada/C/00_000_00_000_0000.json
 * 
 * type: D (district)
 * 各里 總票數細節
 * 61b4dda0ebac3332203ef3729a9a0ada/D/${prv_code}_000_00_000_0000.json
 */
export type ProfileModel = CodeModel & {
    tbox_no: string,
    valid_ticket: number | string,
    invalid_ticket: number | string,
    vote_ticket: number | string,
    votable_population: number,
    population: number,
    cand_num: number,
    elected_num: number,
    cand_male_num: number,
    cand_female_num: number,
    elected_male_num: number,
    elected_female_num: number,
    elect_to_population: number,
    vote_to_elect: number,
    elected_to_cand: number,
    area_name: string,
    ris_prv_code: string,
    ris_city_code: string,
    ris_area_code: string,
    ris_dept_code: string
}

export type ProfileGroupModel = {
    [key: string]: ProfileModel[];
}

/**
 * Area: 縣市區里資料
 * https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/
 * 
 * type: C
 * 台灣->縣市資料
 * 61b4dda0ebac3332203ef3729a9a0ada/C/00_000_00_000_0000.json
 * 
 * type: D
 * 縣市->各區 資料
 * 61b4dda0ebac3332203ef3729a9a0ada/D/${prv_code}_000_00_000_0000.json
 * 
 */
export type AreaModel = CodeModel & {
    area_name: string,
    ris_prv_code: string,
    ris_city_code: string,
    ris_area_code: string,
    ris_dept_code: string
}

export type AreaGroupModel = {
    [key: string]: AreaModel[];
}


/**
 * tickets: 候選人得票細節
 * https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00
 * 
 * type: N (nation)
 * 全台灣 各個候選人 得票數
 * code: 00_000_00_000_0000.json
 */
export type TicketModel = CodeModel & {
    tbox_no:string,
    cand_no: number,
    ticket_num: number | string,
    ticket_percent: number,
    is_victor:string,
    ris_prv_code:string,
    ris_city_code:string,
    ris_area_code:string,
    ris_dept_code:string,
    area_name:string,
    cand_id: number,
    cand_name:string,
    cand_sex:string,
    cand_birthyear:string,
    cand_edu:string,
    party_code: number,
    party_name:string,
    is_current:string,
    is_vice:string
}

export type TicketGroupModel = { 
    [key: string]: TicketModel[] 
}


export type PartyColorModel = {
    party_code: string,
    party_name: string,
    color_code: string
}
