<script>
  import Chat from "./Chat/Chat.svelte";
  import UserForm from "./UserForm.svelte";

  let user;
</script>

{#if user}
  <Chat {user} />
{:else}
  <UserForm bind:user />
{/if}
