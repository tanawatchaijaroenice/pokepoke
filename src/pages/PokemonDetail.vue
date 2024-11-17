<template>
  <div class="grid gap-4 p-10">
    <div class="row-span-3">
      <div class="flex justify-between">
        <div>
          <RouterLink
            :to="{
              path: `/`,
            }"
          >
            <Button
              severity="secondary"
              raised
              icon="pi pi-arrow-left"
              label="Home"
            />
          </RouterLink>
        </div>
        <div class="flex gap-3">
          <Button
            severity="secondary"
            raised
            label="Previous Poke"
            icon="pi pi-arrow-left"
            v-on:click="
              {
                getDetail(true);
              }
            "
          />

          <Button
            severity="secondary"
            raised
            icon="pi pi-arrow-right"
            label="Next Poke"
            iconPos="right"
            v-on:click="getDetail(false)"
          />
        </div>
      </div>

      <Card class="mt-4">
        <template #title>
          <p class="text-center text-5xl">{{ pokeItem?.name }}</p>
        </template>
        <template #content>
          <div class="flex justify-center items-center">
            <img
              class="w-[100%]"
              :alt="pokeItem?.name"
              :src="pokeItem?.sprites?.front_default"
            />
            <img
              class="w-[100%]"
              :alt="pokeItem?.name"
              :src="pokeItem?.sprites?.back_default"
            />
            <img
              class="w-[100%]"
              :alt="pokeItem?.name"
              :src="pokeItem?.sprites?.front_shiny"
            />
            <img
              class="w-[100%]"
              :alt="pokeItem?.name"
              :src="pokeItem?.sprites?.back_shiny"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
  <!-- <div class="grid grid-cols-4">{{ $router }} xxx</div> -->
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { BASE_API_URL } from "../config.ts";
const route = useRoute();
const pokeItem = ref(null);
const pokeId = ref(null);
console.log(BASE_API_URL);
console.log("route.params.id", route.params.id);
console.log("route.query", route.query.pokename);

const getDetail = async (minus: boolean) => {
  if (minus == true) pokeId.value--;
  if (minus == false) pokeId.value++;
  let idFetch = pokeId.value;
  if (idFetch == 0) {
    pokeId.value = 1
    return;
  }
  const res = await fetch(`${BASE_API_URL}/${idFetch}`);
  const data = await res.json();
  pokeItem.value = data;
};

onMounted(() => {
  pokeId.value = Number(route.params.id);
  getDetail();
});
</script>

<style>
.p-card {
  background: #bababa !important;
}
</style>
