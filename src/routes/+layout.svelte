<script lang='ts'>
  import { PUBLIC_CONVEX_URL } from '$env/static/public'
  import favicon from '$lib/assets/favicon.svg'
  import { authClient } from '$lib/auth-client'
  import { Toaster } from '$lib/components/ui/sonner'
  import { createSvelteAuthClient } from '@mmailaender/convex-better-auth-svelte/svelte'
  import { setupConvex } from 'convex-svelte'
  import './layout.css'

  createSvelteAuthClient({ authClient })

  let { children } = $props()

  setupConvex(PUBLIC_CONVEX_URL)
</script>

<svelte:head><link rel='icon' href={favicon} /></svelte:head>
{@render children()}
<Toaster />
