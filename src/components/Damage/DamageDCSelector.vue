<script setup lang="ts">
import { ref } from "vue";
import DamageRoll from "./DamageRoll.vue";
import DamageFlat from "./DamageFlat.vue";
import AP from "./AP.vue";
import { emit } from "process";

const damageRoll = ref<InstanceType<typeof DamageRoll>>();
const damageFlat = ref<InstanceType<typeof DamageFlat>>();
const aP = ref<InstanceType<typeof AP>>();

const masteryLevel = ref(Number(0));

const diceCheckModifierRoll = ref(0);
const diceCheckModifierFlat = ref(0);
const diceCheckModifierAP = ref(0);

const total = ref(0);

const emits = defineEmits([
    "totalUpdate"
])


// methods
const changeDiceCheckRoll = function ({ diceCheck, mastery }: any) {
    if (mastery.value <= masteryLevel.value) {
        diceCheckModifierRoll.value = diceCheck / 2;
    } else {
        diceCheckModifierRoll.value = diceCheck;
    }
    total.value = Math.ceil(
        diceCheckModifierRoll.value +
            diceCheckModifierFlat.value +
            diceCheckModifierAP.value
    );
    emits('totalUpdate', {totalInput: total.value, emmiter: "DamageDCSelector"})
};

const changeDiceCheckFlat = function ({ diceCheck, mastery }: any) {
    if (mastery.value <= masteryLevel.value) {
        diceCheckModifierFlat.value = diceCheck / 2;
    } else {
        diceCheckModifierFlat.value = diceCheck;
    }
    total.value = Math.ceil(
        diceCheckModifierRoll.value +
            diceCheckModifierFlat.value +
            diceCheckModifierAP.value
    );
    emits('totalUpdate', {totalInput: total.value, emmiter: "DamageDCSelector"})
};

const changeDiceCheckAP = function ({ diceCheck, mastery }: any) {
    if (mastery.value <= masteryLevel.value) {
        diceCheckModifierAP.value = diceCheck / 2;
    } else {
        diceCheckModifierAP.value = diceCheck;
    }
    total.value = Math.ceil(
        diceCheckModifierRoll.value +
            diceCheckModifierFlat.value +
            diceCheckModifierAP.value
    );
    emits('totalUpdate', {totalInput: total.value, emmiter: "DamageDCSelector"})
};

const updateAll = function () {
    damageRoll.value?.changeDiceCheck(0);
    damageFlat.value?.changeDiceCheck(0);
    aP.value?.changeDiceCheck(0);
};
</script>

<template>
    <div className="main p-5 m-10 shadow bg-navy-primary">
        <h5 className="text-xl m-2">Damage Calculation</h5>
        <div className="mastery m-2">
            <label className="p-1" htmlFor="masterInput">Mastery</label>
            <select
                className="bg-navy-secondary"
                v-model="masteryLevel"
                @change="updateAll"
                title="Select mastery"
            >
                <option :value="Number(0)">Select a level</option>
                <option :value="Number(1)">1</option>
                <option :value="Number(2)">2</option>
                <option :value="Number(3)">3</option>
                <option :value="Number(4)">4</option>
            </select>
        </div>
        <div className="damage flex flex-col m-2">
            <DamageRoll
                @changeDiceCheckRoll="changeDiceCheckRoll"
                ref="damageRoll"
            />

            <DamageFlat
                @changeDiceCheckFlat="changeDiceCheckFlat"
                ref="damageFlat"
            />

            <AP @changeDiceCheckAP="changeDiceCheckAP" ref="aP" />
        </div>
    </div>
</template>

<style scoped></style>
