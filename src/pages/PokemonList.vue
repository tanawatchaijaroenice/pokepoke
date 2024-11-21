<template>
  <section class="h-screen">
    <div class="w-full h-[4rem]">
      <IconField class="h-full">
        <InputIcon class="pi pi-search h-full" />
        <InputText
          v-model="keyword"
          placeholder="Search"
          class="w-full h-full text-3xl"
          @input="onSearch()"
        />
      </IconField>
    </div>
    <div @change="handleScroll()" ref="el" class="overflow-scroll h-[93vh]">
      <div class="grid grid-cols-4">
        <div
          v-for="(item, index) in pokeList"
          :style="{ backgroundColor: randomColor() }"
          class="bg-[#2959a1] h-[20rem] text-white font-semibold"
        >
          <RouterLink
            :to="{
              path: `/detail/${item.id}`,
              // query: { pokename: item.name },
            }"
          >
            <div
              class="w-full h-full flex flex-col justify-center items-center gap-2"
            >
              <p class="text-3xl">{{ item.name }}</p>

              <UseImage
                class="w-[40%]"
                :alt="item?.name"
                :src="`${BASE_IMG_URL}${'/'}${item.id}${'.png'}`"
              >
                <template #loading>
                  <p class="text-xl">Loading ...</p>
                </template>

                <template #error>
                  <p class="text-xl">Failed</p>
                </template>
              </UseImage>
              <!-- <img
            class="w-[40%]"
            :alt="item?.name"
            :src="`${BASE_IMG_URL}${'/'}${item.id}${'.png'}`"
          /> -->
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { BASE_API_URL, BASE_IMG_URL } from "../config.ts";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { UseImage } from "@vueuse/components";
import { useScroll } from "@vueuse/core";

const el = ref(null);
const scroll = useScroll(el);
const pokeList = ref([]);
const originalList = ref([]);
const keyword = ref("");

const handleScroll = () => {
  // {{ scroll.arrivedState.bottom }}
  console.log("scroll", scroll.arrivedState.bottom);
};

onMounted(async () => {
  const res = await fetch(`${BASE_API_URL}?limit=200`);
  const { results } = await res.json();
  results.forEach((x, index) => {
    index++;
    x.id = index;
  });
  pokeList.value = results;
  originalList.value = results;
});

const onSearch = () => {
  if (!keyword.value.trim()) {
    pokeList.value = originalList.value;
    return;
  }

  pokeList.value = originalList.value.filter((item) =>
    item.name.toLowerCase().includes(keyword.value.toLowerCase())
  );
};

const randomColor = () => {
  const colors = [
    "#FF9AA2", // Light Coral Pink
    "#FFB7B2", // Soft Salmon
    "#FFDAC1", // Soft Peach
    "#E2F0CB", // Light Greenish
    "#B5EAD7", // Soft Mint
    "#C7CEEA", // Lavender Blue
    "#FFABAB", // Soft Red
    "#FFC3A0", // Warm Peach
    "#D5AAFF", // Lavender Purple
    "#85E3FF", // Baby Blue
    "#B9FBC0", // Mint Green
    "#FFCCF9", // Soft Pinkish Purple
    "#FCCB8F", // Warm Orange
    "#F5E1FF", // Pale Purple
    "#D6EFFF", // Light Sky Blue
    "#A8E6CF", // Soft Aqua
    "#FFD3B6", // Pastel Peach
    "#FFAAA5", // Coral Red
    "#FF8C94", // Warm Pink
    "#FF8E72", // Light Orange Coral
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
</script>

<style>
.p-inputtext {
  font-size: 1.5rem !important;
}
</style>
