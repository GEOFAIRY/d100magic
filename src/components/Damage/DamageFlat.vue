<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(["changeDiceCheckFlat"]);

const dcFlatScale = ref(1.25);
const dcRollScale = ref(5);

const diceCheck = ref(0);
const masteryLevelSelected = ref()

const changeDiceCheckEvent = function (event: any) {
    masteryLevelSelected.value = Math.floor((event.target.selectedIndex - 1) / 3) + 1
    changeDiceCheck()
}

const changeDiceCheck = function () {
    emits("changeDiceCheckFlat", {
        diceCheck: diceCheck.value,
        mastery: masteryLevelSelected,
        emitter: "Flat"
    });
};

defineExpose({
    changeDiceCheck
})
</script>

<template>
    <label htmlFor="flatDamage" className="p-1">Flat Damage</label>
    <select
        name="rollDamage"
        id="flatDamage"
        v-model="diceCheck"
        @change="changeDiceCheckEvent($event)"
        title="Select Damage Flat"
        className="bg-navy-secondary p-1"
    >
        <option :value="Number(0)">-</option>
        <option :value="Math.ceil(dcRollScale * 1 * dcFlatScale)">
            {{ 5 }}
        </option>
        <option :value="Math.ceil(dcRollScale * 2 * dcFlatScale)">
            {{ 10 }}
        </option>
        <option
            v-for="i in 10"
            :value="Math.ceil(dcRollScale * (i + 2) * dcFlatScale)"
        >
            {{ Math.floor((i + 2) * 5.5) }}
        </option>
    </select>
</template>

<style scoped></style>
