import { defineStore } from 'pinia';
import { TYPE } from '~/assets/js/enum';
import { getProfileData } from '~/services';
import { useOverall } from './useOverall';

const storeName = 'profile';
export const useProfile = defineStore(storeName, () => {
    // store
    const overall = useOverall();
    const {
        OAId,
        OACode,
        NCode,
    } = storeToRefs(overall);

    // data
    const NationProfile = ref();
    const isNationProfilePending: Ref<boolean> = ref(false);

    const getProfile = async (type: string) => {
        let res;

        try {
            switch (type) {
                case TYPE.NATION:
                    isNationProfilePending.value = true;
                    res = await getProfileData({id: OAId.value, type, code: NCode.value});
                    NationProfile.value = res.data[OACode.value][0];
                    isNationProfilePending.value = false;
                    break;
                case TYPE.DISC:
                    
                    break;
                case TYPE.VLI:
                    
                    break;
                default:
                    break;
            }
        } catch (error) {
            
        }
    }


    return {
        NationProfile,
        isNationProfilePending,
        getProfile,
    }
});