<script lang='ts'>
  import type { AuthState } from '$lib/types'
  import { goto } from '$app/navigation'
  import { authClient } from '$lib/auth-client'
  import * as Card from '$lib/components/ui/card/index.js'
  import Icon from '@iconify/svelte'
  import { toast } from 'svelte-sonner'
  import Button from '../ui/button/button.svelte'
  import Input from '../ui/input/input.svelte'
  import Separator from '../ui/separator/separator.svelte'

  type Props = {
    setState: (state: AuthState) => void
  }

  let { setState }: Props = $props()

  let email = $state('')
  let password = $state('')

  let isLoading = $state(false)

  async function handleSubmit(e: Event) {
    e.preventDefault()

    isLoading = true

    await authClient.signIn.email(
      { email, password },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
        onSuccess: () => {
          goto('/')
        },
        onResponse: () => {
          isLoading = false
        },
      },
    )
  }
</script>

<Card.Root class='w-full h-full p-8'>
  <Card.Header class='px-0 pt-0'>
    <Card.Title>Sign In</Card.Title>
    <Card.Description>
      Use your email or another service to continue
    </Card.Description>
  </Card.Header>
  <Card.Content class='space-y-5 px-0 pb-0'>
    <form class='space-y-2.5' onsubmit={handleSubmit}>
      <Input
        type='email'
        placeholder='Email'
        disabled={isLoading}
        required
        bind:value={email}
      />
      <Input
        type='password'
        placeholder='Password'
        disabled={isLoading}
        required
        bind:value={password}
      />
      <Button
        type='submit'
        class='w-full'
        size='lg'
        disabled={isLoading}
      >
        Continue
      </Button>
    </form>
    <Separator />
    <div class='flex flex-col gap-y-2.5'>
      <Button variant='outline' size='lg' disabled={isLoading} class='w-full relative'>
        <Icon icon='devicon:google' class='size-5 absolute top-2.5 left-2.5' />
        Continue with Google
      </Button>
      <Button variant='outline' size='lg' disabled={isLoading} class='w-full relative'>
        <Icon icon='devicon:github' class='size-5 absolute top-2.5 left-2.5' />
        Continue with Github
      </Button>
    </div>
    <p class='text-xs text-muted-foreground'>
      Don&apos;t have an account? <button onclick={() => setState('sign-up')} class='text-sky-700 hover:underline cursor-pointer'>Sign up</button>
    </p>
  </Card.Content>
</Card.Root>
