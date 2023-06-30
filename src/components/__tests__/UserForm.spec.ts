import { mount } from '@vue/test-utils'
import { createPinia, Pinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter, Router } from 'vue-router'
import { beforeEach, describe, expect, it } from 'vitest'
import UserForm from '../UserForm.vue'
import { routes } from '../../router'

describe('UserForm', () => {
  let pinia: Pinia
  let router: Router

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createMemoryHistory(),
      routes
    })
  })

  it('runs through the workflow', async () => {
    // Next mount UserForm
  })
})
