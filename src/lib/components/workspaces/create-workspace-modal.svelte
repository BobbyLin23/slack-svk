<script lang='ts'>
  import { Button } from '$lib/components/ui/button/index.js'
  import * as Dialog from '$lib/components/ui/dialog/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { createWorkspaceModalStore } from '$lib/stores/modal.js'
</script>

<Dialog.Root open={$createWorkspaceModalStore} onOpenChange={open => !open && createWorkspaceModalStore.close()}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Add a workspace</Dialog.Title>
    </Dialog.Header>
    <form class='space-y-4' onsubmit={() => {}}>
      <Input
        autofocus
        placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
      />
      <div class='flex justify-end'>
        <Button>Create</Button>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>
