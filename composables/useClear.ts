import { TYPE } from "~/assets/js/enum";
import type { ProfileModel, TicketGeneratedModel } from "~/models/data/ElectionModel";
import { createError } from 'nuxt/app';

export const useClear = () => {
    // stores
    const areaStore = useArea();
    const {
        distList,
        vliList,
    } = storeToRefs(areaStore);
    const { getArea } = areaStore;

    const profileStore = useProfile();
    const {
        currentProfile
    } = storeToRefs(profileStore);

    const ticketStore = useTicket();
    const {
        cityTicketList,
        distTicketList,
        vliTicketList
    } = storeToRefs(ticketStore);


    const clear = async () => {
        console.log('clear');
        distList.value = [];
        vliList.value = [];
        currentProfile.value = {} as ProfileModel;
        cityTicketList.value = [] as TicketGeneratedModel[];
        distTicketList.value = [] as TicketGeneratedModel[];
        vliTicketList.value = [] as TicketGeneratedModel[];
        try {
            await getArea(TYPE.CITY);
        } catch (error) {
            throw createError({
                statusCode: error.response?.status || 500,
                statusMessage: error.message || '發生未知錯誤',
                fatal: true
            });
        }
    }
    return {
        clear,
    }
}