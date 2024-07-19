import { defineStore } from 'pinia';
import type { AreaModel, responseModel } from '~/models/data/ElectionModel';
import { getAreaData } from '~/services'
import { useOverall } from './useOverall';
import { TYPE } from '~/assets/js/enum';

const storeName = 'area';
export const useArea = defineStore(storeName, () => {
    // stores
    const overall = useOverall();
    const {
        OAId,
        OAType,
        OACode,
        NCode,
        CCode,
        DCode,
    } = storeToRefs(overall);

    // data
    const cityList: Ref<AreaModel[]> = ref([]);
    const distList: Ref<AreaModel[]> = ref([]);
    const vliList: Ref<AreaModel[]> = ref([]);

    const isCityListPending: Ref<boolean> = ref(true);
    const isDistListPending: Ref<boolean> = ref(true);
    const isVliListPending: Ref<boolean> = ref(true);

    const selectedCity: Ref<AreaModel> = ref({} as AreaModel);
    const selectedDist: Ref<AreaModel> = ref({} as AreaModel);
    const selectedVli: Ref<AreaModel> = ref({} as AreaModel);
    const selectedArea: Ref<AreaModel> = ref({} as AreaModel);
    const areaName = computed(() => (`${selectedCity.value.area_name?selectedCity.value.area_name:''}${selectedDist.value.area_name?'-'+selectedDist.value.area_name:''}${selectedVli.value.area_name?'-'+selectedVli.value.area_name:''}`));
    // methods
    const getArea = async(type:TYPE) => {
        let res;
        try {
            switch (type) {
                case TYPE.CITY:
                    isCityListPending.value = true;
                    res = await getAreaData({id: OAId.value, type, code: NCode.value});
                    cityList.value = res.data[OACode.value];
                    isCityListPending.value = false;
                    isDistListPending.value = false;
                    isVliListPending.value = false;
                    break;
                case TYPE.DISC:
                    isDistListPending.value = true;
                    res = await getAreaData({id: OAId.value, type, code: CCode.value});
                    distList.value = res.data[CCode.value];
                    isDistListPending.value = false;
                    break;
                case TYPE.VLI:
                    isVliListPending.value = true; 
                    res = await getAreaData({id: OAId.value, type, code: CCode.value});
                    vliList.value = res.data[DCode.value];
                    isVliListPending.value = false;
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            
        }
    }


    return {
        cityList,
        distList,
        vliList,
        isCityListPending,
        isDistListPending,
        isVliListPending,
        selectedCity,
        selectedDist,
        selectedVli,
        selectedArea,
        areaName,
        getArea,
    }
});