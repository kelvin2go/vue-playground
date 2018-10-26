export const increment = state => {
  state.count++
  state.history.push('increment')
}

export const decrement = state => {
  state.count--
  state.history.push('decrement')
}

export const openSidebar = state => {
  state.sidebar = true
}

export const closeSidebar = state => {
  state.sidebar = false
}

export const toggleSidebar = state => {
  state.sidebar = !state.sidebar
}

export const setSidebar = (state, n) => {
  state.sidebar = n
}
