<script>
  export let errors;
  export let placeholder;
  export let value = "";

  let touched = false;
  $: value ? (touched = true) : null;
</script>

<style>
  .row {
    margin-bottom: 10px;
  }
  input {
    margin: 0;
    outline: none;
  }
  .invalid input {
    border-color: red;
  }
  .valid input {
    border-color: #11cc11;
  }
  .error {
    color: red;
  }
</style>

<div
  class={['row', touched && errors ? 'invalid' : touched ? 'valid' : ''].join(' ')}>
  <input bind:value {placeholder} />

  {#if touched && errors}
    <div class="error">
      <small>{errors}</small>
    </div>
  {/if}
</div>
