<script>
  export let onSubmit;

  let text = "";
  $: isValid = text.length > 0;
</script>

<form
  on:submit|preventDefault={() => {
    onSubmit(text);
    text = '';
  }}>

  <input bind:value={text} placeholder="enter your message" />

  <button disabled={!isValid}>Send</button>
</form>
