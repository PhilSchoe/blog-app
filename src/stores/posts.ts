import { type Post, today, thisWeek, thisMonth } from '../posts'
import { defineStore } from 'pinia'

interface PostsState {
  ids: string[]
  all: Map<string, Post>
}

export const usePosts = defineStore('posts', {
  state: (): PostsState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    all: new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth],
    ])
  }),

  actions: {
    // ...
  }
})
