<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(["changeDiceCheckRoll"]);

const dcRollScale = ref(5);

const diceCheck = ref(0);
const masteryLevelSelected = ref()

const changeDiceCheckEvent = function (event: any) {
    masteryLevelSelected.value = Math.floor((event.target.selectedIndex - 1) / 3) + 1
    changeDiceCheck()
}

const changeDiceCheck = function() {
    emits("changeDiceCheckRoll", {
        diceCheck: diceCheck.value,
        mastery: masteryLevelSelected,
        emitter: "Roll"
    });
};

defineExpose({
    changeDiceCheck
})
</script>

<template>
    <label htmlFor="rollDamage" className="p-1">Damage Roll</label>
    <select
        name="rollDamage"
        id="rollDamage"
        v-model="diceCheck"
        @change="changeDiceCheckEvent($event)"
        title="Select Damage Roll"
        className="bg-navy-secondary p-1"
    >
        <option :value="Number(0)">-</option>
        <option :value="Math.ceil(dcRollScale * 1)">D10</option>
        <option :value="Math.ceil(dcRollScale * 2)">D10+5</option>
        <option v-for="i in 10" :value="Math.ceil(dcRollScale * (i + 2))">
            {{ i + 1 }}D10+5
        </option>
    </select>
</template>

<style scoped></style>
