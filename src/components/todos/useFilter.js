/**
 * 组件逻辑提取 filter操作
 */

import {reactive, computed} from 'vue'
const filters = {
	all(todos) {
		return todos
	},
	active(todos) {
		return todos.filter((todo) => !todo.completed)
	},
	completed(todos) {
		return todos.filter((todo) => todo.completed)
	},
}

export function useFilter(todos) {
  const filterState = reactive({
    filterItems: [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Completed', value: 'completed' },
    ],
    visibility: 'all',
    filterTodos: computed(() => {
      // 访问的是ref 因此是获取value
      return filters[filterState.visibility](todos.value)
    }),
  })
  return filterState
}