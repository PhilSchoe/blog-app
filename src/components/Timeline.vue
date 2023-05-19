<script setup lang="ts">
import { ref } from 'vue'

const periods = ['Today', 'This Week', 'This Month']

const selectedPeriod = ref('Today')

function selectPeriod(period: string) {
  selectedPeriod.value = period
}
</script>

<template>
  <nav class="is-primary panel">
    {{ selectedPeriod }}
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        v-bind:class="{ 'is-active': period === selectedPeriod }"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
  </nav>
</template>
