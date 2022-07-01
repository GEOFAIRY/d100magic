<script setup lang="ts">
import { ref } from "vue";
import DamageDCSelector from "./Damage/DamageDCSelector.vue";

const totalDamageDC = ref(0);

const total = ref(0);

const totalUpdate = function ({ totalInput, emmiter }: any) {
    console.log({ totalInput, emmiter });
    switch (emmiter) {
        case "DamageDCSelector":
            totalDamageDC.value = totalInput;
            break;
        default:
            break;
    }
    total.value = totalDamageDC.value + 0;
};
</script>

<template>
    <div className="main flex text-teal-50">
        <DamageDCSelector @totalUpdate="totalUpdate" />
    </div>
    <div
        className="absolute bottom-0 left-0 "
    >
        <div className="bg-navy-primary shadow text-teal-50 p-5 m-10">
            <h3 className="text-xl">
                <p className="text-sm inline">Total:</p>
                {{ total }}
            </h3>
        </div>
    </div>
</template>

<style scoped></style>
