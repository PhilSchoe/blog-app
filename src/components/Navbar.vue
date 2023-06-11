<script lang="ts" setup>
import { useUsers } from '@/stores/users'
import { useModal } from '../composables/modal'

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
        <button class="button" @click.prevent="modal.showModal('signUp')">Sign Up</button>
        <button class="button" @click.prevent="modal.showModal('signIn')">Sign In</button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
