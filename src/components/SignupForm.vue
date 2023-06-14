<script setup lang="ts">
import type { NewUser } from '@/users'
import UserForm from './UserForm.vue'
import { useUsers } from '@/stores/users'
import { useModal } from '../composables/modal'

const usersStore = useUsers()
const modal = useModal()

async function handleSignup(newUser: NewUser) {
  await usersStore.createUser(newUser)
  modal.hideModal()
}
</script>

<template>
  <UserForm @submit="handleSignup" />
</template>
