<script lang="ts" setup>
import { useUsers } from '@/stores/users'
import { useModal } from '../composables/modal'
import { useRouter } from 'vue-router'

const modal = useModal()
const usersStore = useUsers()
const router = useRouter()

async function logout() {
  await usersStore.logout()
  router.push({ path: '/' })
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="usersStore.currentUserId" class="buttons">
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
        <button class="button" data-testid="logout" @click.prevent="logout">Log Out</button>
      </div>

      <div v-else class="buttons">
        <button id="sign-up" class="button" @click.prevent="modal.showModal('signUp')">
          Sign Up
        </button>
        <button data-testid="sign-in" class="button" @click.prevent="modal.showModal('signIn')">
          Sign In
        </button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
