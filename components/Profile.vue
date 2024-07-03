<script setup lang="ts">
import type { ProfileModel } from '~/models/data/ElectionModel';

type Props = {
    profile: ProfileModel,
    isPending: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    profile: () => ({} as ProfileModel),
    isPending: true
});

onMounted( async() => {

})
</script>

<template>
    <div class="Profile">
        <h1 v-show="isPending">Loading~~~</h1>
        <div v-show="profile.area_name">
            <h1>Profile: {{ profile.area_name }}</h1>
            <p>投票率: {{profile.elected_to_cand}} %</p>
            <p>投票數: {{profile.vote_ticket}} 票</p>
            <p>有效票數: {{profile.valid_ticket}}  票</p>
            <p>無效票數: {{profile.invalid_ticket}}  票</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .Profile {
        border: 1px solid blueviolet;
        background-color: lightblue;
    }
</style>
