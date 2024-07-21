import { TYPE } from "~/assets/js/enum";
import type { AreaModel, ProfileModel } from "~/models/data/ElectionModel";
import type { TicketGeneratedModel } from '~/models/view/ViewModel';
import { createError } from 'nuxt/app';
import { FetchError } from "ofetch";

export const useClear = () => {
    // stores
    const areaStore = useArea();
    const {
        cityList,
        distList,
        vliList,
        selectedCity,
        selectedDist,
        selectedVli,
        selectedArea
    } = storeToRefs(areaStore);
    const { getArea } = areaStore;

    const profileStore = useProfile();
    const {
        currentProfile,
        NationProfile
    } = storeToRefs(profileStore);
    const { getProfile } = useProfile();

    const ticketStore = useTicket();
    const {
        nationalTicketList,
        currentTicketList,
        cityTicketList,
        distTicketList,
        vliTicketList
    } = storeToRefs(ticketStore);
    const { getTicket } = useTicket();


    const clear = async () => {
        cityList.value = [];
        distList.value = [];
        vliList.value = [];
        cityTicketList.value = [] as TicketGeneratedModel[];
        distTicketList.value = [] as TicketGeneratedModel[];
        vliTicketList.value = [] as TicketGeneratedModel[];
        selectedCity.value = {} as AreaModel;
        selectedDist.value = {} as AreaModel;
        selectedVli.value = {} as AreaModel;
        selectedArea.value = {} as AreaModel;
        try {
            await getArea(TYPE.CITY);
            await getProfile(TYPE.NATION);
            await getTicket(TYPE.NATION);
        } catch (error) {
            const FetchError = error as FetchError;
            throw createError({
                statusCode: FetchError.response?.status || 500,
                statusMessage: FetchError.message || '發生未知錯誤',
                fatal: true
            });
        }
        // currentProfile.value = NationProfile.value;
        // currentTicketList.value = nationalTicketList.value;
    }
    return {
        clear,
    }
}