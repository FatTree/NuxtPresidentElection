import { defineStore } from 'pinia';
import { TYPE } from '~/assets/js/enum';
import type { PartyColorModel, TicketGeneratedModel, TicketModel } from '~/models/data/ElectionModel';
import { getTicketData } from '~/services';

const storeName = 'ticket';
export const useTicket = defineStore(storeName, () => {
    // store
    const overall = useOverall();
    const {
        OAId,
        OACode,
        CCode,
        DCode,
        VCode,
        NCode,
        OAColorTable
    } = storeToRefs(overall);


    // data
    const isNationTicketPending: Ref<boolean> = ref(false);
    const isCityTicketPending: Ref<boolean> = ref(false);
    const isDistTicketPending: Ref<boolean> = ref(false);
    const isVliTicketPending: Ref<boolean> = ref(false);

    const nationalTicketList: Ref<TicketGeneratedModel[]> = ref([]);
    const cityTicketList: Ref<TicketGeneratedModel[]> = ref([]);
    const distTicketList: Ref<TicketGeneratedModel[]> = ref([]);
    const vliTicketList: Ref<TicketGeneratedModel[]> = ref([]);

    // method
    const ticketListGenerator = (list: TicketModel[]): TicketGeneratedModel[] => {
        const groupBy = (input: TicketModel[], key: string): [] => {
            return input.reduce((acc, currentValue) => {
                let groupKey: string | number = currentValue[key as keyof TicketModel];
                if (!acc[groupKey]) {
                    acc[groupKey] = [];
                }
                acc[groupKey].push(currentValue);
                return acc;
            }, []);
        };

        const combine = (cand: TicketModel, vice: TicketModel) => {
            const _obj = cand;
            const _party: PartyColorModel | undefined = OAColorTable.value.find( e => {
                return e.party_code === _obj.party_code.toString();
            });
            return {...cand, vice_name: vice.cand_name, party_color: _party!.color_code}
        }

        const compare = ( a: TicketGeneratedModel, b: TicketGeneratedModel ) => {
            if ( a.ticket_num > b.ticket_num ){
                return -1;
            }
            if ( a.ticket_num < b.ticket_num ){
                return 1;
            }
            return 0;
        }

        const newArr: [] = groupBy(list, "cand_no");
        const ticketList: TicketGeneratedModel[] = [];
        for( let i=1; i<newArr.length; i++) {
            let pre, vice;
            let temp: TicketModel = newArr[i][0]
            if (temp.is_vice.trim() === "") {
                pre = temp;
                vice = newArr[i][1];
            } else {
                pre = newArr[i][1];
                vice = temp;
            }
            ticketList.push(combine(pre, vice));
        }
        return ticketList.sort( compare );
    }

    const getTicket = async(type: string) => {
        let res;
        try {
            switch (type) {
                case TYPE.NATION:
                    isNationTicketPending.value = true;
                    res = await getTicketData({id: OAId.value, type: TYPE.NATION, code: OACode.value});
                    nationalTicketList.value = ticketListGenerator(res.data[OACode.value]);
                    isNationTicketPending.value = false;
                    break;

                case TYPE.CITY:
                    isCityTicketPending.value = true;
                    res = await getTicketData({id: OAId.value, type: TYPE.CITY, code: OACode.value});
                    cityTicketList.value = ticketListGenerator(res.data[OACode.value].filter((e: TicketModel) => (`${e.prv_code}_${e.city_code}_00_000_0000` === CCode.value)));
                    isCityTicketPending.value = false;
                    console.log(cityTicketList.value);
                    break;

                case TYPE.DISC:
                    isDistTicketPending.value = true;
                    res = await getTicketData({id: OAId.value, type: TYPE.DISC, code: CCode.value});
                    distTicketList.value = ticketListGenerator(res.data[CCode.value].filter((e: TicketModel) => (`${e.prv_code}_${e.city_code}_00_${e.dept_code}_0000` === DCode.value)));
                    isDistTicketPending.value = false;
                    break;

                case TYPE.VLI:
                    isVliTicketPending.value = true;
                    res = await getTicketData({id: OAId.value, type: TYPE.VLI, code: CCode.value});
                    vliTicketList.value = ticketListGenerator(res.data[DCode.value].filter((e: TicketModel) => (`${e.prv_code}_${e.city_code}_00_${e.dept_code}_${e.li_code}` === VCode.value)));
                    isVliTicketPending.value = false;
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }


    return {
        nationalTicketList,
        cityTicketList,
        distTicketList,
        vliTicketList,
        isNationTicketPending,
        isCityTicketPending,
        isDistTicketPending,
        isVliTicketPending,
        getTicket
    }
});