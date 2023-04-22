<template>
  <div class="bg-white">
    <div class="relative isolate">
      <div class="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="pl-2 py-1 bg-indigo-50 text-indigo-500">
Building Physics Online
      </div>
      <div class="pt-7 mx-auto max-w-7xl text-center">
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
An online collection of building physics and simulation resources
          </h1>
        </div>
        <p class="mt-2 text-sm text-gray-600">
The term building physics, or building engineering physics, covers the building services engineering field dedicated to the investigation of energy efficiency of old and new buildings. This skill-set was traditionally encompassed within sustainability teams, but differentiated by the use of computational modelling. The discipline addresses several different areas in building performance including: air movement, thermal performance, moisture, energy, acoustics, light, climate and biology, typically through modelling based quantification.
        </p>
      </div>
      <div class="px-4 pt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 z-10">
        <ResourceCard v-for="resource in resources"
                      :key="resource.key"
                      :resource="resource" />
      </div>
      <div class="pt-2 pb-1 pr-2 text-sm text-gray-500 text-right">Copyright (C) 2019-2023 Julien de Charentenay</div>
    </div>
  </div>
</template>

<script>
import ResourceCard from "@/components/ResourceCard.vue";
import { resources } from "@/js/resources.js";

export default {
  name: 'App',
  components: {
    ResourceCard,
  },
  computed: {
    resources: () => resources,
  },
}
</script>
