<script setup lang="ts">
import { DateTime } from 'luxon'
import { ref, computed } from 'vue'
import { type TimelinePost } from '../posts'
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
  return postsStore.ids.reduce((accumulator: TimelinePost[], id: string) => {
    const post = postsStore.all.get(id)
    
    if (post == null || post.created == null) {
      throw Error(`Post with id of ${id} was epexcted, but not found.`)
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
