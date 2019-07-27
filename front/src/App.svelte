<script>
  import Chat from "/Chat/Chat.svelte";
  import UserForm from "/UserForm.svelte";
  import Header from "/Header.svelte";

  let user;
</script>

<style lang="postcss">
  .main {
    @apply p-8;
  }
</style>

<div class="container mx-auto h-screen bg-gray-200">
  <Header />

  <div class="main">
    {#if user}
      <Chat {user} />
    {:else}
      <UserForm bind:user />
    {/if}
  </div>
</div>
