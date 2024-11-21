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
              icon="pi pi-home"
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
          <p class="text-center text-5xl mb-5">{{ pokeItem?.name }}</p>
        </template>
        <template #content>
          <div class="flex justify-center items-center">
            <div class="w-[40%] h-[20rem] flex justify-center items-center">
              <UseImage
                class="h-full"
                :alt="'front_default'"
                :src="handleImg(pokeItem, 'front_default')"
              >
                <template #loading>
                  <div
                    class="text-3xl font-semibold flex justify-center items-center w-full h-full loading gradient"
                  ></div>
                </template>

                <template #error>
                  <p
                    class="text-3xl font-semibold flex justify-center items-center w-full h-full"
                  >
                    Failed
                  </p>  
                </template>
              </UseImage>
            </div>
            <div class="w-[40%] h-[20rem] flex justify-center items-center">
              <UseImage
                class="h-full"
                :alt="'back_default'"
                :src="handleImg(pokeItem, 'back_default')"
              >
                <template #loading>
                  <div
                    class="text-3xl font-semibold flex justify-center items-center w-full h-full loading gradient"
                  ></div>
                </template>

                <template #error>
                  <p
                    class="text-3xl font-semibold flex justify-center items-center w-full h-full"
                  >
                    Failed
                  </p>
                </template>
              </UseImage>
            </div>
            <div class="w-[40%] h-[20rem] flex justify-center items-center">
              <UseImage
                class="h-full"
                :alt="'front_shiny'"
                :src="handleImg(pokeItem, 'front_shiny')"
              >
                <template #loading>
                  <div
                    class="text-3xl font-semibold flex justify-center items-center w-full h-full loading gradient"
                  ></div>
                </template>

                <template #error>
                  <p
                    class="text-3xl font-semibold flex justify-center items-center w-full h-full"
                  >
                    Failed
                  </p>
                </template>
              </UseImage>
            </div>
            <div class="w-[40%] h-[20rem] flex justify-center items-center">
              <UseImage
                class="h-full"
                :alt="'back_shiny'"
                :src="handleImg(pokeItem, 'back_shiny')"
              >
                <template #loading>
                  <div
                    class="text-3xl font-semibold flex justify-center items-center w-full h-full loading gradient"
                  ></div>
                </template>

                <template #error>
                  <p
                    class="text-3xl font-semibold flex justify-center items-center w-full h-full"
                  >
                    Failed
                  </p>
                </template>
              </UseImage>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
  <!-- <div class="grid grid-cols-4">{{ $router }} xxx</div> -->
</template>

<script setup lang="ts">
import { UseImage } from "@vueuse/components";
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
    pokeId.value = 1;
    return;
  }
  const res = await fetch(`${BASE_API_URL}/${idFetch}`);
  const data = await res.json();
  pokeItem.value = data;
};

const handleImg = (pokeItem, imgName) => {
  const image = pokeItem?.sprites[imgName] ?? "";
  return image;
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

.loading {
  width: 80%;
  height: 90%;
  border-radius: 10px;
}

.gradient {
  background: linear-gradient(270deg, lightgray, darkgrey);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 2s ease infinite;
  -moz-animation: AnimationName 2s ease infinite;
  animation: AnimationName 2s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
