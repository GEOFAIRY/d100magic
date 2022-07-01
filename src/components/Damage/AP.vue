<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(["changeDiceCheckAP"]);

const APOptions = ref([3, 5, 6, 8, 10, 11, 13, 15, 16, 18, 20, 21]);
const dcApScale = ref(0.75);
const dcRollScale = ref(5);

const diceCheck = ref(0);
const masteryLevelSelected = ref();

const changeDiceCheckEvent = function (event: any) {
    masteryLevelSelected.value =
        Math.floor((event.target.selectedIndex - 1) / 3) + 1;
    changeDiceCheck();
};

const changeDiceCheck = function (diceCheckUpdate: any = undefined) {
    diceCheckUpdate !== undefined ? (diceCheck.value = diceCheckUpdate) : false;
    emits("changeDiceCheckAP", {
        diceCheck: diceCheck.value,
        mastery: masteryLevelSelected,
        emitter: "AP"
    });
};

defineExpose({
    changeDiceCheck,
});
</script>

<template>
    <label htmlFor="apDamage" className="p-1">AP</label>
    <select
        name="rollDamage"
        id="apDamage"
        v-model="diceCheck"
        @change="changeDiceCheckEvent($event)"
        title="Select AP Damage"
        className="bg-navy-secondary p-1"
    >
        <option :value="Number(0)">-</option>
        <option v-for="i in 12" :value="Math.ceil(dcRollScale * i * dcApScale)">
            {{ APOptions[i - 1] }}
        </option>
    </select>
</template>

<style scoped></style>
