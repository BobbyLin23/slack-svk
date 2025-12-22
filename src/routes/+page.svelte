<script lang='ts'>
  import UserButton from '$lib/components/auth/user-button.svelte'

  let { data } = $props()
</script>

<UserButton data={data} />
