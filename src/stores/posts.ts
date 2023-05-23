import type { Period } from '@/constants'
import { type Post, today, thisWeek, thisMonth, type TimelinePost } from '../posts'
import { defineStore } from 'pinia'
import { DateTime } from 'luxon'

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  selectedPeriod: Period
}

export const usePosts = defineStore('posts', {
  state: (): PostsState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    all: new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth],
    ]),
    selectedPeriod: "Today"
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    }
  },

  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids.reduce((accumulator: TimelinePost[], id: string) => {
        const post = state.all.get(id)
        
        if (post == null || post.created == null) {
          throw Error(`Post with id of ${id} was epexcted, but not found.`)
        }
    
        const transformedPost = {
          ...post,
          created: DateTime.fromISO(post.created)
        }
    
        if (state.selectedPeriod === 'Today') {
          if (transformedPost.created >= DateTime.now().minus({ day: 1 })) {
            accumulator.push(transformedPost)
          }
        } else if (state.selectedPeriod === 'This Week') {
          if (transformedPost.created >= DateTime.now().minus({ week: 1 })) {
            accumulator.push(transformedPost)
          }
        } else {
          accumulator.push(transformedPost)
        }
    
        return accumulator
      }, [])
    }
  }
})
