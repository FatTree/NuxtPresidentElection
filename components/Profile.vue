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

const allData = computed(() => {
    return [
        {
            label: '投票率',
            backgroundColor: '#333',
            data: props.profile.vote_to_elect,
        },
        {
            label: '未投票率',
            backgroundColor: '#bfbfbf',
            data: 100 - props.profile.vote_to_elect,
        }
    ]
});

</script>

<template>
    <div class="Profile">
        <h1 v-show="isPending">Loading~~~</h1>
        <div v-show="profile.area_name">
            <h1>Profile: {{ profile.area_name }}</h1>
            <div>
                <DonutPie
                    v-if="!isPending"
                    :chartType="'doughnut'"
                    :data="allData" />
            </div>
            <p>{{ $t('overall.voteRate') }}: {{ profile.vote_to_elect }} %</p>
            <p>{{ $t('overall.VoteNum') }}: {{profile.vote_ticket}} {{ $t('UI.ticket') }}</p>
            <p>{{ $t('overall.validNum') }}: {{profile.valid_ticket}} {{ $t('UI.ticket') }}</p>
            <p>{{ $t('overall.inValidNum') }}: {{profile.invalid_ticket}} {{ $t('UI.ticket') }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .Profile {
        border: 1px solid blueviolet;
        background-color: lightblue;
    }
    .Doughnut {
        width: 300px;
        height: 300px;
    }
</style>
