export const increment = ({ commit }) => {
  commit('increment')
}
export const decrement = ({ commit }) => {
  commit('decrement')
}

export const incrementIfOdd = ({ commit, state }) => {
  if ((state.count + 1) % 2 === 0) {
    commit('increment')
  }
}

export const incrementAsync = ({ commit }) => {
  setTimeout(() => {
    commit('increment')
  }, 1000)
}

export const openSideBar = ({ commit }) => {
  commit('openSidebar')
}

export const closeSidebar = ({ commit }) => {
  commit('closeSidebar')
}

export const setSidebar = ({ commit }) => {
  commit('closeSidebar')
}

export const toggleSidebar = ({ commit }) => {
  commit('toggleSidebar')
}
