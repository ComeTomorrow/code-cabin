import { defineStore } from "pinia"
import { ref } from "vue"

// export const useCounterStore = defineStore('counter', {
//     state() {
//         return {
//             num: 1
//         }
//     },
//     actions: {
//         increment() {
//             this.num++
//         }
//     }
// })
export const useCounterStore = defineStore('counter', ()=>{
    const num = ref(0)
    function increment() {
        num.value++
    }
    return { num, increment }
})

//  default useCounterStore;