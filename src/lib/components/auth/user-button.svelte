<script lang='ts'>
  import { goto } from '$app/navigation'
  import { api } from '$convex/_generated/api'
  import { authClient } from '$lib/auth-client'
  import * as Avatar from '$lib/components/ui/avatar/index.js'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js'
  import { LoaderIcon, LogOutIcon } from '@lucide/svelte'
  import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte'
  import { useQuery } from 'convex-svelte'
  import { toast } from 'svelte-sonner'

  let { data } = $props()

  const auth = useAuth()
  const isLoading = $derived(auth.isLoading && !data.currentUser)
  const isAuthenticated = $derived(auth.isAuthenticated || !!data.currentUser)
  const currentUserResponse = useQuery(api.auth.getCurrentUser, () => (isAuthenticated ? {} : 'skip'))
  let user = $derived(currentUserResponse.data ?? data.currentUser)

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          goto('/auth')
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      },
    })
  }
</script>

{#if isLoading}
  <LoaderIcon class='size-4 text-muted-foreground animate-spin' />
{/if}
{#if user}
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class='outline-none relative'>
      <Avatar.Root class='rounded-md size-10 hover:opacity-75 transition'>
        <Avatar.Image
          class='rounded-md'
          alt={user.name}
          src={user.image}
        />
        <Avatar.Fallback class='rounded-md bg-sky-500 text-white '>
          {user.name!.charAt(0).toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align='center' side='right' class='w-60'>
      <DropdownMenu.Item onclick={() => signOut()} class='h-10'>
        <LogOutIcon class='size-4 mr-2' />
        Log out
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
{/if}
