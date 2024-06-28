import { defineStore } from 'pinia';
import type { PartyColorModel } from '~/models/data/ElectionModel';
import { getColorData } from '~/services';

const storeName = 'overall';
export const useOverall = defineStore(storeName, () => {
    const OAId = ref('');
    const OAType = ref('C');
    const OACode = ref('');

    const NCode = ref('00_000_00_000_0000');
    const CCode = ref('');
    const DCode = ref('');
    const VCode = ref('');

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