<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue'
import type { Post, TimelinePost } from '@/posts'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'
import { usePosts } from '../stores/posts'
import { useUsers } from '@/stores/users'

// props

const props = defineProps<{
  post: TimelinePost | Post
}>()

// emits

const emit = defineEmits<{
  (event: 'submit', post: Post): void
}>()

// variables

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

const posts = usePosts()
const router = useRouter()
const usersStore = useUsers()

/*
watchEffect( () => {
  marked.parse(content.value, (err, parseResult) => {
    html.value = parseResult
  })
})
*/

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code) {
      return highlightjs.highlightAuto(code).value
    }
  })
)

function parseHtml(markdown: string) {
  html.value = marked.parse(markdown, {
    mangle: false,
    headerIds: false,
    gfm: true,
    breaks: true,
    async: false
  })
}

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent)
  }, 250),
  {
    immediate: true
  }
)

// lifecycle hooks

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})

// functions

function handleInput(): void {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value?.innerText
}

async function handleClick(): Promise<void> {
  if (!usersStore.currentUserId) {
    throw Error('User was not found')
  }

  if (!props.post.created) {
    throw Error('Created DateTime missing')
  }

  const newPost: Post = {
    ...props.post,
    created:
      typeof props.post.created === 'string' ? props.post.created : props.post.created.toISO(),
    title: title.value,
    authorId: usersStore.currentUserId,
    markdown: content.value,
    html: html.value
  }

  emit('submit', newPost)
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div
        contenteditable
        data-testid="contenteditable"
        ref="contentEditable"
        @input="handleInput"
      />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button
        data-testid="submit"
        class="button is-primary is-pulled-right"
        @click.prevent="handleClick"
      >
        Save Post
      </button>
    </div>
  </div>
</template>
