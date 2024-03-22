<template>
    <div class="flex flex-column gap-2">
        <div>
            {{ catsStore.count }}
        </div>
        <div>
            {{ catsStore.doubleCount }}
        </div>
        <Button @click="catsStore.increment" severity="success" label="Increment" icon="pi pi-plus" icon-pos="left" class="w-12rem"></Button>
        <Button @click="catsStore.getCatFact()" severity="success" label="Get fact" icon="pi pi-cloud-download" icon-pos="left" class="w-12rem"></Button>

        <div v-for="(fact, index) in catsStore.catFacts" :key="fact">
            {{index}}. {{ fact }}
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCatsStore } from '../../stores/cats'
import Button from 'primevue/button';

const catsStore = useCatsStore()

const counter = ref()

</script>

