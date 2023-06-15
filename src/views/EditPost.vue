<script setup lang="ts">
import PostWriter from '@/components/PostWriter.vue'
import type { Post } from '@/posts'
import { usePosts } from '@/stores/posts'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const postsStore = usePosts()
const router = useRouter()

const id = route.params.id as string
const post = postsStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} was not found`)
}

async function handleSubmit(post: Post) {
  await postsStore.updatePost(post)
  router.push('/')
}
</script>

<template>
  Edit Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
