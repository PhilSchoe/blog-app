<script setup lang="ts">
import { DateTime } from 'luxon'
import { ref, computed } from 'vue'
import { type Post, today, thisWeek, thisMonth } from '../posts'

const periods = ['Today', 'This Week', 'This Month'] as const

type Period = (typeof periods)[number]

const selectedPeriod = ref<Period>('Today')

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = computed(() => {
  return [today, thisWeek, thisMonth].reduce(
    (accumulator: { created: DateTime; id: string; title: string }[], post: Post) => {
      if (post.created == null) {
        return accumulator
      }

      const transformedPost = {
        ...post,
        created: DateTime.fromISO(post.created)
      }

      if (selectedPeriod.value === 'Today') {
        if (transformedPost.created >= DateTime.now().minus({ day: 1 })) {
          accumulator.push(transformedPost)
        }
      } else if (selectedPeriod.value === 'This Week') {
        if (transformedPost.created >= DateTime.now().minus({ week: 1 })) {
          accumulator.push(transformedPost)
        }
      } else {
        accumulator.push(transformedPost)
      }

      return accumulator
    },
    []
  )
})
</script>

<template>
  <nav class="is-primary panel">
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

    <a v-for="post of posts" :key="post.id" class="panel-block">
      {{ post.title }}
      {{ post.created.toFormat('d MMM') }}
    </a>
  </nav>
</template>
