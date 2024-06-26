import { defineStore } from 'pinia';
import type { AreaModel } from '~/models/data/ElectionModel';
import { getAreaList } from '~/services'
import { useOverall } from './useOverall';
import { TYPE } from '~/assets/js/enum';


const storeName = 'area';
export const useArea = defineStore(storeName, () => {
    const overall = useOverall();
    const {
        OAId,
        OAType,
        OACode,
        NCode,
        CCode,
        DCode,
    } = storeToRefs(overall);

    const cityList: Ref<AreaModel[]> = ref([]);
    const distList: Ref<AreaModel[]> = ref([]);
    const vliList: Ref<AreaModel[]> = ref([]);

    const selectedCity = ref();
    const selectedDist = ref();
    const selectedVli = ref();

    const getArea = async(type:string) => {
        let res;
        try {
            switch (type) {
                case TYPE.CITY:
                    res = await getAreaList({id: OAId.value, type, code: NCode.value});
                    cityList.value = res.data[OACode.value];
                    break;
                case TYPE.DISC:
                    res = await getAreaList({id: OAId.value, type, code: CCode.value});
                    distList.value = res.data[CCode.value];
                    break;
                case TYPE.VLI:
                    res = await getAreaList({id: OAId.value, type, code: CCode.value});
                    vliList.value = res.data[DCode.value];
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    // const getCityList = async() => {
    //     try {
    //         const params = {id: OAId.value, type: OAType.value, code: OACode.value}
    //         const res = await getAreaList(params);
    //         cityList.value = res.data[OACode.value];
    //         console.log(cityList.value);
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    return {
        cityList,
        distList,
        vliList,
        getArea,
    }
});