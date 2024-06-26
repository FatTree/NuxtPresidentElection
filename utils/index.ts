import type { CodeModel } from '~/models/data/ElectionModel';
/**
 * Ticket:
 * https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/N/00_000_00_000_0000.json
 * type: N ,code: 00_000_00_000_0000
 * https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/C/00_000_00_000_0000.json
 * type: C ,code: 00_000_00_000_0000
 * https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/D/68_000_00_000_0000.json
 * https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/D/10_015_00_000_0000.json
 * type: D ,code: 68_000_00_000_0000
 * https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/L/68_000_00_000_0000.json
 * type: L ,code: 68_000_00_000_0000
 */
export const generateCode = (model: CodeModel): string => {
    const {...code} = model;
    let _CCode = `${code.prv_code}_${code.city_code}_${code.area_code}_${code.dept_code}_${code.li_code}`;
    console.log("_CCode:", _CCode);
    
    return _CCode;
}