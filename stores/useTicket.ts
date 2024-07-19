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
        OAColorTable
    } = storeToRefs(overall);

    // data
    const isNationTicketPending: Ref<boolean> = ref(false);
    const isCityTicketPending: Ref<boolean> = ref(true);
    const isDistTicketPending: Ref<boolean> = ref(true);
    const isVliTicketPending: Ref<boolean> = ref(true);
    const isCurrentTicketPending: Ref<boolean> = ref(true);

    const nationalTicketList: Ref<TicketGeneratedModel[]> = ref([]);
    const cityTicketList: Ref<TicketGeneratedModel[]> = ref([]);
    const distTicketList: Ref<TicketGeneratedModel[]> = ref([]);
    const vliTicketList: Ref<TicketGeneratedModel[]> = ref([]);
    const currentTicketList: Ref<TicketGeneratedModel[]> = ref([]);

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
        
        // combine president and vice
        const combine = (cand: TicketModel, vice: TicketModel) => {
            const _obj: TicketModel = cand;
            const _party: PartyColorModel | undefined = 
                OAColorTable.value.find( e => (e.party_code === _obj.party_code.toString()));
            // cand.ticket_num = (cand.ticket_num).toLocaleString('en');
            return {...cand, vice_name: vice.cand_name, party_color: _party!.color_code}
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

    const setCurrentVal = (list: TicketGeneratedModel[]) => {
        currentTicketList.value = list;
        isCurrentTicketPending.value = false;
    }

    const getTicket = async(type: string) => {
        let res;
        try {
            switch (type) {
                case TYPE.NATION:
                    isNationTicketPending.value = true;
                    isCurrentTicketPending.value = true;
                    res = await getTicketData({id: OAId.value, type: TYPE.NATION, code: OACode.value});
                    nationalTicketList.value = ticketListGenerator(res.data[OACode.value]);
                    isNationTicketPending.value = false;
                    setCurrentVal(nationalTicketList.value);
                    break;

                case TYPE.CITY:
                    isCityTicketPending.value = true;
                    isCurrentTicketPending.value = true;
                    res = await getTicketData({id: OAId.value, type: TYPE.CITY, code: OACode.value});
                    cityTicketList.value = ticketListGenerator(res.data[OACode.value].filter((e: TicketModel) => (`${e.prv_code}_${e.city_code}_00_000_0000` === CCode.value)));
                    isCityTicketPending.value = false;
                    isDistTicketPending.value = false;
                    isVliTicketPending.value = false;
                    setCurrentVal(cityTicketList.value);
                    break;

                case TYPE.DISC:
                    isDistTicketPending.value = true;
                    isCurrentTicketPending.value = true;
                    res = await getTicketData({id: OAId.value, type: TYPE.DISC, code: CCode.value});
                    distTicketList.value = ticketListGenerator(res.data[CCode.value].filter((e: TicketModel) => (`${e.prv_code}_${e.city_code}_00_${e.dept_code}_0000` === DCode.value)));
                    isDistTicketPending.value = false;
                    setCurrentVal(distTicketList.value);
                    break;

                case TYPE.VLI:
                    isVliTicketPending.value = true;
                    isCurrentTicketPending.value = true;
                    res = await getTicketData({id: OAId.value, type: TYPE.VLI, code: CCode.value});
                    vliTicketList.value = ticketListGenerator(res.data[DCode.value].filter((e: TicketModel) => (`${e.prv_code}_${e.city_code}_00_${e.dept_code}_${e.li_code}` === VCode.value)));
                    isVliTicketPending.value = false;
                    setCurrentVal(vliTicketList.value);
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
        currentTicketList,
        isNationTicketPending,
        isCityTicketPending,
        isDistTicketPending,
        isVliTicketPending,
        isCurrentTicketPending,
        getTicket
    }
});





