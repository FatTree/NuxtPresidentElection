import { defineStore } from 'pinia';
import { getElectionsList } from '~/services'
import { ref } from 'vue';

const storeName = 'electionList';
export const useElectionStore = defineStore(storeName, () => {
    const electionList = ref();
    const isPending: Ref<Boolean> = ref(false);

    const getElectionStore = async () => {
        const data = await getElectionsList();
        
    }

    
    return {
        electionList,
        getElectionStore,
    }
});