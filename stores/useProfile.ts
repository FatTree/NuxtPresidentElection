import { defineStore } from 'pinia';
import { TYPE } from '~/assets/js/enum';
import { getProfileData } from '~/services';
import { useOverall } from './useOverall';
import type { ProfileModel } from '~/models/data/ElectionModel';

const storeName = 'profile';
export const useProfile = defineStore(storeName, () => {
    // store
    const overall = useOverall();
    const {
        OAId,
        OACode,
        CCode,
        DCode,
        VCode,
        NCode,
    } = storeToRefs(overall);

    // data
    const NationProfile: Ref<ProfileModel> = ref({} as ProfileModel);
    const cityProfile: Ref<ProfileModel> = ref({} as ProfileModel);
    const distProfile: Ref<ProfileModel> = ref({} as ProfileModel);
    const vliProfile: Ref<ProfileModel> = ref({} as ProfileModel);
    const currentProfile: Ref<ProfileModel> = ref({} as ProfileModel);

    const isNationProfilePending: Ref<boolean> = ref(false);
    const isCityProfilePending: Ref<boolean> = ref(false);
    const isDistProfilePending: Ref<boolean> = ref(false);
    const isVliProfilePending: Ref<boolean> = ref(false);
    const isCurrentProfilePending: Ref<boolean> = ref(false);

    

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

                case TYPE.CITY:
                    isCityProfilePending.value = true;
                    res = await getProfileData({id: OAId.value, type, code: NCode.value});
                    cityProfile.value = res.data[OACode.value].filter((e: ProfileModel) => (`${e.prv_code}_${e.city_code}_00_000_0000` === CCode.value))[0];
                    currentProfile.value = cityProfile.value;
                    isCurrentProfilePending.value = false;
                    isCityProfilePending.value = false;
                    break;

                case TYPE.DISC:
                    isDistProfilePending.value = true;
                    res = await getProfileData({id: OAId.value, type: TYPE.DISC, code: CCode.value});
                    distProfile.value = res.data[CCode.value].filter((e: ProfileModel) => (`${e.prv_code}_${e.city_code}_00_${e.dept_code}_0000` === DCode.value))[0];
                    currentProfile.value = distProfile.value;
                    isCurrentProfilePending.value = false;
                    isDistProfilePending.value = false;
                    break;

                case TYPE.VLI:
                    isVliProfilePending.value = true;
                    res = await getProfileData({id: OAId.value, type: TYPE.VLI, code: CCode.value});
                    vliProfile.value = res.data[DCode.value].filter((e: ProfileModel) => (`${e.prv_code}_${e.city_code}_${e.area_code}_${e.dept_code}_${e.li_code}` === VCode.value))[0];
                    currentProfile.value = vliProfile.value;
                    isCurrentProfilePending.value = false;
                    isVliProfilePending.value = false;
                    break;
                    
                default:
                    break;
            }
        } catch (error) {
            
        }
    }


    return {
        NationProfile,
        cityProfile,
        distProfile,
        vliProfile,
        currentProfile,
        isNationProfilePending,
        isCityProfilePending,
        isDistProfilePending,
        isVliProfilePending,
        isCurrentProfilePending,
        getProfile,
    }
});