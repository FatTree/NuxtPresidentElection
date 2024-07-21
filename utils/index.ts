import type { CodeModel, PartyColorModel, TicketGroupModel, TicketModel } from '~/models/data/ElectionModel';
import type { MapViewModel, tempList, cityPathModel } from '~/models/view/ViewModel';

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
    
    return _CCode;
}

// ticket
export const compare = ( a: TicketModel, b: TicketModel ) => {
    if ( a.ticket_num > b.ticket_num ){
        return -1;
    }
    if ( a.ticket_num < b.ticket_num ){
        return 1;
    }
    return 0;
}

export const groupBy = (input: TicketModel[], key: string): TicketGroupModel => {
    return input.reduce((acc, currentValue) => {
        let groupKey: string | number = currentValue[key as keyof TicketModel];
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(currentValue);
        return acc;
    }, {});
};

export const getTicketWinnerList = ($keys: string[], $group: TicketGroupModel): TicketModel[] => {
    const _list: TicketModel[] = [];
    $keys.forEach( (_k ) => {
        const _president = $group[_k].filter( (e: TicketModel) => (e.is_vice.trim() === ''));
        const _winner: TicketModel = _president.sort(compare)[0];
        _list.push(_winner);
    });
    return _list;
}

export const combineWinnerAndColorList = ($winnerList: TicketModel[], $OAColorTable: PartyColorModel[]): tempList[] => {
    return $winnerList.map( (e: TicketModel) => {
        const _obj: PartyColorModel = $OAColorTable.find((_pColor) => {
            return e.party_code.toString() === _pColor.party_code 
        }) as PartyColorModel;
        const _e: tempList = {party_color: _obj.color_code,...e};
        
        return _e;
    });
}

export const combineWinnerColorAndMapList = ($combineList: tempList[], $cityPath: { name: string[]; path: string; }[]): MapViewModel[] => {
    return $combineList.map( _l => {
        let _obj: MapViewModel = {} as MapViewModel;
        $cityPath.find((_cityPath: cityPathModel) => {
            const name: string[] = _cityPath.name;
            if (name.some( (cityName) => (cityName === _l.area_name))) {
                const _newPath = _cityPath.path.replace('<g id', `<g style="fill:#${_l.party_color}" id`)
                _obj = {name, path: _newPath, ..._l};
            }
        });
        return _obj;
    });
}