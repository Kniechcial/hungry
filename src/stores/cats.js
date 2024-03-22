import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCatsStore = defineStore('cats', () => {

  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }


  const catFacts = ref([])
  async function getCatFact() {

    const response = await fetch("https://catfact.ninja/fact")
    const responseData = await response.json()

    catFacts.value.push(responseData.fact)

  }


  return { 
    count,
    doubleCount, 
    increment,
    getCatFact,
    catFacts
}
})
