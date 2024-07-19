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
        <!-- <h1 v-show="isPending">Loading~~~</h1> -->
        <Loader v-show="isPending" size="5em" border="10px"/>
        <div v-show="!isPending" class="Profile__box">
            <div class="upper">
                <DonutPie
                    v-if="!isPending"
                    :chartType="'doughnut'"
                    :data="allData" />
                <div class="upper__text">
                    <p class="upper__text__title">{{ $t('overall.voteRate') }}</p>
                    <p class="upper__text__content">{{ profile.vote_to_elect }} %</p>
                </div>
            </div>
            <div class="buttom">
                <div class="buttom__text">
                    <label class="title">{{ $t('overall.VoteNum') }}: </label> 
                    <label class="content">{{profile.vote_ticket}} {{ $t('UI.ticket') }}</label>
                </div>
                <div class="buttom__text">
                    <label class="title">{{ $t('overall.validNum') }}: </label> 
                    <label class="content">{{profile.valid_ticket}} {{ $t('UI.ticket') }}</label>
                </div>
                <div class="buttom__text">
                    <label class="title">{{ $t('overall.inValidNum') }}: </label> 
                    <label class="content">{{profile.invalid_ticket}} {{ $t('UI.ticket') }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .Profile {
        min-width: 280px;
        min-height: 232px;
        &__box {
            @include mobile {
                display: flex;
            }
        }
        .upper {
            display: flex;
            align-items: center;

            @include pad {
                display: block;
            }
            @include mobile {
                display: flex;
                width: auto;
            }

            &__text {
                display: block;
                text-align: center;
                margin-left: 1em;

                @include pad {
                    margin-top: 1em;
                    display: flex;
                }
                @include mobile {
                    display: block;
                    width: 80px;
                    margin-left: 0;
                }
            }
            &__text__title {
                @include title-m; 
                text-align: center;
            }
            &__text__content {
                @include text-m;
            }
        }

        .buttom {
            margin-top: 1em;

            &__text {
                line-height: 2em;
                @include mobile {
                    line-height: 1.5em;
                }

                > .title {
                    @include text-m;
                }
                > .content {
                    @include text-m;
                    @include text-blod;
                }
            }
        }
    }
</style>
