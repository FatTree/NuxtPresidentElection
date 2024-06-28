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
        NCode,
        OAColorTable
    } = storeToRefs(overall);


    // data
    const isNationTicketPending: Ref<boolean> = ref(false);
    const nationalTicketList: Ref<TicketGeneratedModel[]> = ref([]);

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

        // {
        //     "cand_no": 1,
        //     "ticket_num": 3690466,
        //     "ticket_percent": 26.46,
        //     "is_victor": " ",
        //     "cand_name": "柯文哲",
        //     "cand_edu": "博士",
        //     "party_code": 350,
        //     "party_name": "台灣民眾黨",
        //     "is_current": "N",
        //     "is_vice": " ",
        //     "vice_name": "吳欣盈"
        // }
        
        return ticketList.sort( compare );
    }

    const getTicket = async(type: string) => {
        let res;
        try {
            switch (type) {
                case TYPE.NATION:
                    isNationTicketPending.value = true;
                    // Ticket: /4d83db17c1707e3defae5dc4d4e9c800/N/00_000_00_000_0000.json
                    res = await getTicketData({id: OAId.value, type:"N", code: OACode.value});
                    nationalTicketList.value = ticketListGenerator(res.data[OACode.value]);
                    isNationTicketPending.value = false;
                    
                    break;
                case TYPE.DISC:
                    
                    break;
                case TYPE.VLI:
                    
                    break;
                default:
                    break;
            }
        } catch (error) {
            
        }
        
    }


    return {
        nationalTicketList,
        isNationTicketPending,
        getTicket
    }
});