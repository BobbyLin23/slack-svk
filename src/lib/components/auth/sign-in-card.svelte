<script lang='ts'>
  import type { AuthState } from '$lib/types'
  import * as Card from '$lib/components/ui/card/index.js'
  import Icon from '@iconify/svelte'
  import Button from '../ui/button/button.svelte'
  import Input from '../ui/input/input.svelte'
  import Separator from '../ui/separator/separator.svelte'

  type Props = {
    setState: (state: AuthState) => void
  }

  let { setState }: Props = $props()

  let email = $state('')
  let password = $state('')
</script>

<Card.Root class='w-full h-full p-8'>
  <Card.Header class='px-0 pt-0'>
    <Card.Title>Sign In</Card.Title>
    <Card.Description>
      Use your email or another service to continue
    </Card.Description>
  </Card.Header>
  <Card.Content class='space-y-5 px-0 pb-0'>
    <form class='space-y-2.5'>
      <Input
        type='email'
        placeholder='Email'
        disabled={false}
        required
        bind:value={email}
      />
      <Input
        type='password'
        placeholder='Password'
        disabled={false}
        required
        bind:value={password}
      />
      <Button
        type='submit'
        class='w-full'
        size='lg'
        disabled={false}
      >
        Continue
      </Button>
    </form>
    <Separator />
    <div class='flex flex-col gap-y-2.5'>
      <Button variant='outline' size='lg' disabled={false} class='w-full relative'>
        <Icon icon='devicon:google' class='size-5 absolute top-2.5 left-2.5' />
        Continue with Google
      </Button>
      <Button variant='outline' size='lg' disabled={false} class='w-full relative'>
        <Icon icon='devicon:github' class='size-5 absolute top-2.5 left-2.5' />
        Continue with Github
      </Button>
    </div>
    <p class='text-xs text-muted-foreground'>
      Don&apos;t have an account? <button onclick={() => setState('sign-up')} class='text-sky-700 hover:underline cursor-pointer'>Sign up</button>
    </p>
  </Card.Content>
</Card.Root>
