import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { useUsers } from './stores/users'
import { usePosts } from './stores/posts'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

const usersStore = useUsers()
const postsStore = usePosts()

Promise.all([usersStore.authenticate(), postsStore.fetchPosts()]).then(() => {
  app.use(router)
  app.mount('#app')
})
