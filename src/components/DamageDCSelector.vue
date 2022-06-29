<script setup lang="ts">
import { ref } from "vue";
import DamageRoll from "./DamageRoll.vue";
import DamageFlat from "./DamageFlat.vue";
import AP from "./AP.vue";

const damageRoll = ref<InstanceType<typeof DamageRoll>>();
const damageFlat = ref<InstanceType<typeof DamageFlat>>();
const aP = ref<InstanceType<typeof AP>>();

const masteryLevel = ref(Number(0));
const damageRollBool = ref(false);
const damageFlatBool = ref(false);
const aPBool = ref(false);

const diceCheckModifierRoll = ref(0);
const diceCheckModifierFlat = ref(0);
const diceCheckModifierAP = ref(0);

const changeDiceCheckRoll = function ({ diceCheck, mastery }: any) {
    if (mastery.value === masteryLevel.value) {
        diceCheckModifierRoll.value = diceCheck / 2;
    } else {
        diceCheckModifierRoll.value = diceCheck;
    }
};

const changeDiceCheckFlat = function ({ diceCheck, mastery }: any) {
    if (mastery.value === masteryLevel.value) {
        diceCheckModifierFlat.value = diceCheck / 2;
    } else {
        diceCheckModifierFlat.value = diceCheck;
    }
};

const changeDiceCheckAP = function ({ diceCheck, mastery }: any) {
    if (mastery.value === masteryLevel.value) {
        diceCheckModifierAP.value = diceCheck / 2;
    } else {
        diceCheckModifierAP.value = diceCheck;
    }
};

const updateAll = function () {
    damageRoll.value?.changeDiceCheck(0);
    damageFlat.value?.changeDiceCheck(0);
    aP.value?.changeDiceCheck(0);
};
</script>

<template>
    <div class="main">
        <div class="mastery">
            <label for="masterInput">Mastery</label>
            <select v-model="masteryLevel" @change="updateAll">
                <option :value="Number(0)">Select a level</option>
                <option :value="Number(1)">1</option>
                <option :value="Number(2)">2</option>
                <option :value="Number(3)">3</option>
                <option :value="Number(4)">4</option>
            </select>
        </div>
        <div class="damage" v-show="masteryLevel !== 0">
            <input
                type="checkbox"
                id="roll"
                value="roll"
                v-model="damageRollBool"
                @change="updateAll"
            />
            <label for="roll">Roll</label>

            <input
                type="checkbox"
                id="flat"
                value="flat"
                v-model="damageFlatBool"
                @change="updateAll"
            />
            <label for="flat">Flat</label>

            <input
                type="checkbox"
                id="ap"
                value="ap"
                v-model="aPBool"
                @change="updateAll"
            />
            <label for="ap">AP</label>

            <div v-show="damageRollBool">
                <DamageRoll
                    @changeDiceCheckRoll="changeDiceCheckRoll"
                    ref="damageRoll"
                />
            </div>
            <div v-show="damageFlatBool">
                <DamageFlat
                    @changeDiceCheckFlat="changeDiceCheckFlat"
                    ref="damageFlat"
                />
            </div>
            <div v-show="aPBool">
                <AP @changeDiceCheckAP="changeDiceCheckAP" ref="aP" />
            </div>
        </div>

        <h4>
            Total:
            {{
                Math.ceil(
                    diceCheckModifierRoll +
                        diceCheckModifierFlat +
                        diceCheckModifierAP
                )
            }}
        </h4>
    </div>
</template>

<style scoped></style>
