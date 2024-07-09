import type { ProfileModel, TicketGeneratedModel } from "~/models/data/ElectionModel";

export const useClear = () => {
    // stores
    const areaStore = useArea();
    const {
        distList,
        vliList,
    } = storeToRefs(areaStore);

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

    const clear = () => {
        console.log('clear');
        distList.value = [];
        vliList.value = [];
        currentProfile.value = {} as ProfileModel;
        cityTicketList.value = [] as TicketGeneratedModel[];
        distTicketList.value = [] as TicketGeneratedModel[];
        vliTicketList.value = [] as TicketGeneratedModel[];
    }
    return {
        clear,
    }
}