<template>
  <div class="rounded-2xl border border-gray-200">
    <div class="bg-slate-50 rounded-t-2xl pl-4 pt-1 text-gray-800 front-bold text-lg">
      {{ resource.name }}
    </div>
    <div class="bg-slate-50 pl-4 pb-1 text-sm text-indigo-500">
      <a :href="resource.url">{{ resource.url }}</a>
    </div>
    <div class="bg-slate-50/75 py-1 px-2 text-gray-500 text-sm flex flex-col"
         :class="{'hidden': expanded === false}">
      <div class="text-gray-600 pb-1 ">{{ resource.description }}</div>
      <div v-id="resource.author !== ''">By: {{ resource.author }}</div>
      <div v-if="resource.type !== ''" class="italic ml-4">
        <span>{{ resource.type }} </span><span class="ml-1">{{ resource.license }}</span>
      </div>
      <div v-if="resource.hashtags !== ''" class="ml-4">
      {{ resource.hashtags }}
      </div>
    </div>
    <div class="bg-slate-50/75 rounded-b-2xl py-2 px-2 flex flex-row justify-between items-center">
      <div class="text-indigo-600 text-base">
        <a :href="resource.url">Visit</a>
      </div>
      <div class="hover:bg-slate-200 rounded-full p-3 text-gray-600" @click="expanded = !expanded">
        <ChevronDownIcon class="w-5 h-5" v-if="expanded === false"/>
        <ChevronUpIcon   class="w-5 h-5" v-else />
      </div>
    </div>
  </div>
</template>
<script>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
export default {
  name: "ResourceCard",
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
  },
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      expanded: false,
    };
  },
}
</script>
