<script setup lang="ts">
import PostWriter from '@/components/PostWriter.vue'
import type { Post, TimelinePost } from '@/posts'
import { DateTime } from 'luxon'
import { useUsers } from '@/stores/users'
import { usePosts } from '@/stores/posts'
import { useRouter } from 'vue-router'

const usersStore = useUsers()
const router = useRouter()
const postsStore = usePosts()

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

async function handleSubmit(post: Post) {
  await postsStore.createPost(post)
  router.push('/')
}
</script>

<template>
  New Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
