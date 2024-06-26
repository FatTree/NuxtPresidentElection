import { defineStore } from 'pinia';

const storeName = 'overall';
export const useOverall = defineStore(storeName, () => {
    const OAId = ref('');
    const OAType = ref('C');
    const OACode = ref('');

    const NCode = ref('00_000_00_000_0000');
    const CCode = ref('');
    const DCode = ref('');
    const VCode = ref('');

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
        setIdTypeCode
    }
});