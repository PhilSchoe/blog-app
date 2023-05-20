<script setup lang="ts">
import { DateTime } from 'luxon'
import { ref, computed } from 'vue'
import { type Post, today, thisWeek, thisMonth, type TimelinePost } from '../posts'
import TimelineItem from './TimelineItem.vue'
import { usePosts } from '@/stores/posts'

const postsStore = usePosts()

const periods = ['Today', 'This Week', 'This Month'] as const

type Period = (typeof periods)[number]

const selectedPeriod = ref<Period>('Today')

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = computed<TimelinePost[]>(() => {
  return [today, thisWeek, thisMonth].reduce((accumulator: TimelinePost[], post: Post) => {
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
  }, [])
})
</script>

<template>
  {{ postsStore.getState().foo }}
  <button @click="postsStore.updateFoo('bar')">Update</button>
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

    <TimelineItem v-for="post of posts" :key="post.id" :post="post" />
  </nav>
</template>
