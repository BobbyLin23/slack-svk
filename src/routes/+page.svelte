<script lang='ts'>
  import { goto } from '$app/navigation'
  import { api } from '$convex/_generated/api.js'
  import { authClient } from '$lib/auth-client.js'
  import Button from '$lib/components/ui/button/button.svelte'
  import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte'
  import { useQuery } from 'convex-svelte'

  let { data } = $props()

  const auth = useAuth()
  const isLoading = $derived(auth.isLoading && !data.currentUser)
  const isAuthenticated = $derived(auth.isAuthenticated || !!data.currentUser)

  const currentUserResponse = useQuery(api.auth.getCurrentUser, () => (isAuthenticated ? {} : 'skip'))
  let user = $derived(currentUserResponse.data ?? data.currentUser)

  async function signOut() {
    const result = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          goto('/auth')
        },
      },
    })
    if (result.error) {
      console.error('Sign out error:', result.error)
    }
  }

  let accessToken = $state<string | null>(null)
  let tokenLoading = $state(false)
  async function fetchToken() {
    tokenLoading = true
    try {
      const token = await auth.fetchAccessToken({ forceRefreshToken: true })
      accessToken = token
    }
    catch (error) {
      console.error('Error fetching access token:', error)
      accessToken = 'Error fetching token'
    }
    finally {
      tokenLoading = false
    }
  }
</script>

<div class='flex h-screen flex-col items-center justify-center bg-gray-50'>
  {#if isLoading}
    <div class='text-lg text-gray-600'>Loading...</div>

  {:else if isAuthenticated}
    <!-- Dashboard Component -->
    <div class='w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md'>
      <div class='mb-4 text-xl font-semibold text-gray-800'>
        Hello {user?.name}!
      </div>
      <!-- Demo: Access Token Section -->
      <div class='mb-4 rounded-md bg-gray-50 p-4'>
        <h3 class='mb-2 text-sm font-medium text-gray-700'>Access Token Demo</h3>
        <button
          onclick={fetchToken}
          disabled={tokenLoading}
          class='cursor-pointer rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {tokenLoading ? 'Fetching...' : 'Fetch Access Token'}
        </button>
        {#if accessToken}
          <div class='mt-2 rounded border bg-white p-2 text-xs break-all text-gray-600'>
            {accessToken.length > 50 ? `${accessToken.substring(0, 50)}...` : accessToken}
          </div>
        {/if}
      </div>
      <Button
        onclick={signOut}
        class='cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none'
      >
        Sign out
      </Button>
    </div>
  {/if}
</div>
