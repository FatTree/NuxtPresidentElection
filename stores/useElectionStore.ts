import { defineStore } from 'pinia';
import { getElectionsData } from '~/services'
import { ref } from 'vue';
import type { ElectionModel } from '~/models/data/ElectionModel';

const storeName = 'electionList';
export const useElectionStore = defineStore(storeName, () => {
    const electionList: Ref<ElectionModel[]> = ref([]);
    const isPending: Ref<Boolean> = ref(false);

    const getElectionList = async () => {
        try {
            const {data} = await getElectionsData();
            electionList.value = data[0].theme_items;
        } catch (error) {
            console.error(error)
        }
        
    }

    
    return {
        electionList,
        getElectionList,
    }
});