import { ref, shallowRef } from 'vue'
import SingupForm from '@/components/SignupForm.vue'
import TestComponent from '@/components/TestComponent.vue'

const show = ref(false)
const component = shallowRef()

export function useModal() {
  return {
    show,
    component,
    showModal: (type: 'signUp' | 'signIn') => {
      show.value = true
      switch (type) {
        case 'signIn':
          return (component.value = TestComponent)
        case 'signUp':
          return (component.value = SingupForm)
      }
    },
    hideModal: () => (show.value = false)
  }
}
