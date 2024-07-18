import { TYPE } from "~/assets/js/enum";
import type { ProfileModel, TicketGeneratedModel } from "~/models/data/ElectionModel";
import { createError } from 'nuxt/app';
import { FetchError } from "ofetch";

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
        currentProfile,
        NationProfile
    } = storeToRefs(profileStore);

    const ticketStore = useTicket();
    const {
        nationalTicketList,
        currentTicketList,
        cityTicketList,
        distTicketList,
        vliTicketList
    } = storeToRefs(ticketStore);


    const clear = async () => {
        distList.value = [];
        vliList.value = [];
        currentProfile.value = NationProfile.value;
        currentTicketList.value = nationalTicketList.value;
        cityTicketList.value = [] as TicketGeneratedModel[];
        distTicketList.value = [] as TicketGeneratedModel[];
        vliTicketList.value = [] as TicketGeneratedModel[];
        // try {
        //     await getArea(TYPE.CITY);
        // } catch (error) {
        //     const FetchError = error as FetchError;
        //     throw createError({
        //         statusCode: FetchError.response?.status || 500,
        //         statusMessage: FetchError.message || '發生未知錯誤',
        //         fatal: true
        //     });
        // }
    }
    return {
        clear,
    }
}