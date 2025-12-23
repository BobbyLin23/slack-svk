<script lang='ts'>
  import { goto } from '$app/navigation'
  import { api } from '$convex/_generated/api.js'
  import UserButton from '$lib/components/auth/user-button.svelte'
  import { createWorkspaceModalStore } from '$lib/stores/modal.js'
  import { useQuery } from 'convex-svelte'

  let { data } = $props()

  const workspacesQuery = useQuery(api.workspaces.get, {})

  const workspaceId = $derived(workspacesQuery.data?.[0]?._id)

  $effect(() => {
    if (workspacesQuery.isLoading) {
      return
    }

    if (workspaceId) {
      goto(`/workspace/${workspaceId}`)
    }
    else if (!$createWorkspaceModalStore) {
      createWorkspaceModalStore.open()
    }
  })
</script>

<UserButton data={data} />
