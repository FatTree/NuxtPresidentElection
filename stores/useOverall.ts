import { defineStore } from 'pinia';
import type { PartyColorModel } from '~/models/data/ElectionModel';
import { getColorData } from '~/services';

const storeName = 'overall';
export const useOverall = defineStore(storeName, () => {
    const OAId = ref('');
    const OAType = ref('C');
    const OACode = ref('');
    
    const OA_prv_code = ref('10');
    const OA_city_code = ref('015');
    const OA_area_code = ref('00');
    const OA_dept_code = ref('010');
    const OA_li_code = ref('0001');

    const NCode = ref('00_000_00_000_0000');
    const CCode = computed(() => (`${OA_prv_code.value}_${OA_city_code.value}_00_000_0000`));
    // profiles/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/D/10_015_00_000_0000.json
    const DCode = computed(() => (`${OA_prv_code.value}_${OA_city_code.value}_${OA_area_code.value}_${OA_dept_code.value}_0000`));
    // profiles/ELC/P0/00/4d83db17c1707e3defae5dc4d4e9c800/L/10_015_00_000_0000.json
    const VCode = computed(() => (`${OA_prv_code.value}_${OA_city_code.value}_${OA_area_code.value}_${OA_dept_code.value}_${OA_li_code.value}`));
    const OAColorTable: Ref<PartyColorModel[]> = ref([]);

    const getColor = async() => {
        try {
            const res = await getColorData();
            OAColorTable.value = res.data as PartyColorModel[];
            
        } catch (error) {
            console.log(error);
        }
    }

    const setIdTypeCode = (id: string, type: string, code: string) => {
        OAId.value = id;
        OAType.value = type;
        OACode.value = code;
    }
    
    return {
        OAId,
        OAType,
        OACode,
        NCode,
        CCode,
        DCode,
        VCode,
        OAColorTable,
        setIdTypeCode,
        getColor,
    }
});