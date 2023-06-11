<script lang="ts" setup>
import { useUsers } from '@/stores/users'
import { useModal } from '../composables/modal'
import SingupForm from './SingupForm.vue'

const modal = useModal()
const usersStore = useUsers()
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="usersStore.currentUserId" class="buttons">
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
        <button class="button" @click.prevent="usersStore.logout()">Log out</button>
      </div>

      <div v-else class="buttons">
        <button class="button" @click.prevent="modal.showModal()">Sign Up</button>
        <RouterLink to="/posts/new" class="button">Sign In</RouterLink>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <SingupForm />
  </Teleport>
</template>
