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
        const formatter = (_res: ProfileModel) => {
            _res.invalid_ticket = (_res.invalid_ticket).toLocaleString('en');
            _res.valid_ticket = (_res.valid_ticket).toLocaleString('en');
            _res.vote_ticket = (_res.vote_ticket).toLocaleString('en');
            return _res;
        }
        try {
            switch (type) {
                case TYPE.NATION:
                    isNationProfilePending.value = true;
                    res = await getProfileData({id: OAId.value, type, code: NCode.value});
                    const _result: ProfileModel = res.data[OACode.value][0];
                    NationProfile.value = formatter(_result);
                    isNationProfilePending.value = false;
                    break;

                case TYPE.CITY:
                    isCityProfilePending.value = true;
                    res = await getProfileData({id: OAId.value, type, code: NCode.value});
                    const _cityResult = res.data[OACode.value].filter((e: ProfileModel) => (`${e.prv_code}_${e.city_code}_00_000_0000` === CCode.value))[0];
                    currentProfile.value = formatter(_cityResult);
                    isCurrentProfilePending.value = false;
                    isCityProfilePending.value = false;
                    break;

                case TYPE.DISC:
                    isDistProfilePending.value = true;
                    res = await getProfileData({id: OAId.value, type: TYPE.DISC, code: CCode.value});
                    const _distResult = res.data[CCode.value].filter((e: ProfileModel) => (`${e.prv_code}_${e.city_code}_00_${e.dept_code}_0000` === DCode.value))[0];
                    currentProfile.value = formatter(_distResult);
                    isCurrentProfilePending.value = false;
                    isDistProfilePending.value = false;
                    break;

                case TYPE.VLI:
                    isVliProfilePending.value = true;
                    res = await getProfileData({id: OAId.value, type: TYPE.VLI, code: CCode.value});
                    const _vliResult = res.data[DCode.value].filter((e: ProfileModel) => (`${e.prv_code}_${e.city_code}_${e.area_code}_${e.dept_code}_${e.li_code}` === VCode.value))[0];
                    currentProfile.value = formatter(_vliResult);
                    isCurrentProfilePending.value = false;
                    isVliProfilePending.value = false;
                    break;
                    
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
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