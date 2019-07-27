<script>
  import Chat from "/Chat/Chat.svelte";
  import UserForm from "/UserForm.svelte";

  let user;
</script>

<style lang="postcss">
  .main {
    @apply p-8;
  }
</style>

<div class="container mx-auto h-screen bg-gray-200">

  <div class="main">
    {#if user}
      <Chat {user} />
    {:else}
      <UserForm bind:user />
    {/if}
  </div>
</div>
