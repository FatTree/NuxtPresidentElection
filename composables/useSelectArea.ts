import { TYPE } from "~/assets/js/enum";
import type { AreaModel } from "~/models/data/ElectionModel";

export const useSelectArea = () => {
    // store
    const overallStore = useOverall();
    const {
        OA_prv_code,
        OA_city_code,
        OA_area_code,
        OA_dept_code,
        OA_li_code,
    } = storeToRefs(overallStore);

    const areaStore = useArea();
    const {
        vliList,
        selectedCity,
        selectedDist,
        selectedVli
    } = storeToRefs(areaStore);
    const { getArea } = areaStore;

    const profileStore = useProfile();
    const { getProfile } = profileStore;

    const ticketStore = useTicket();
    const { getTicket } = ticketStore;

    const setSelectedCity = async (selectedArea: AreaModel ,prv_code: string, city_code: string, area_code: string) => {
        // 0. set Codes
        OA_prv_code.value = prv_code;
        OA_city_code.value = city_code;
        OA_area_code.value = area_code;
        selectedCity.value = selectedArea;
        try {
            // 1. get DList
            await getArea(TYPE.DISC);
            // 2. clear VLi List | Selected
            vliList.value = [];
            // 3. get Profile/Ticket
            await getProfile(TYPE.CITY);
            await getTicket(TYPE.CITY);
        } catch (error) {
            console.error(error);
        }
    }

    const setSelectedDist = async(selectedArea: AreaModel, dept_code: string) => {
        // 0. set Codes
        OA_dept_code.value = dept_code;
        selectedDist.value = selectedArea;
        try {
            // 1. get VliList
            await getArea(TYPE.VLI);
            // 2. get Profileget Profile/Ticket
            await getProfile(TYPE.DISC);
            await getTicket(TYPE.DISC);
        } catch (error) {
            console.error(error);
        }
    }

    const setSelectedVli = async(selectedArea: AreaModel, li_code: string) => {
        // 0. set Codes
        OA_li_code.value = li_code;
        selectedVli.value = selectedArea;
        try {
            // 1. get Profile/Ticket
            await getProfile(TYPE.VLI);
            await getTicket(TYPE.VLI);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        setSelectedCity,
        setSelectedDist,
        setSelectedVli
    }
}
