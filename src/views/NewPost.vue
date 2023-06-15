<script setup lang="ts">
import PostWriter from '@/components/PostWriter.vue'
import type { TimelinePost } from '@/posts'
import { DateTime } from 'luxon'
import { useUsers } from '@/stores/users'

const usersStore = useUsers()

if (!usersStore.currentUserId) {
  throw Error('User was not found')
}

const post: TimelinePost = {
  id: '-1',
  title: 'Title',
  authorId: usersStore.currentUserId,
  created: DateTime.now(),
  markdown: '## Title',
  html: ''
}
</script>

<template>
  New Post
  <PostWriter :post="post" />
</template>
