<script lang='ts'>
  import type { AuthState } from '$lib/types'
  import SignInCard from './sign-in-card.svelte'
  import SignUpCard from './sign-up-card.svelte'

  let state = $state<AuthState>('sign-in')
</script>

<div class='h-full flex items-center justify-center bg-[#5C3B58]'>
  <div class='md:h-auto md:w-[420px]'>
    {#if state === 'sign-in'}
      <SignInCard setState={val => state = val} />
    {:else}
      <SignUpCard setState={val => state = val} />
    {/if}
  </div>
</div>
