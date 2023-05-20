<script setup lang="ts">
import type { TimelinePost } from '@/posts'

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <a class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
    {{ post.title }}
    {{ post.created.toFormat('d MMM') }}
  </a>
</template>
