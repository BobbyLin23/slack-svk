import { writable } from 'svelte/store'

function createWorkspaceModal() {
  const { subscribe, update } = writable(false)

  return {
    subscribe,
    open: () => update(() => true),
    close: () => update(() => false),
  }
}

export const createWorkspaceModalStore = createWorkspaceModal()
