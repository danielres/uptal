<script>
  import io from "socket.io-client";

  import config from "/config";
  import Message from "./Message.svelte";
  import MessageForm from "./MessageForm.svelte";

  export let user;

  const socket = io(config.serverUrl);
  socket.on("chat message", m => (messages = [...messages, m]));

  let messages = [];

  const submitMessage = text =>
    socket.emit("chat message", { author: user.userName, text });
</script>

{#each messages as message}
  <Message {message} />
  <hr />
{/each}

<MessageForm onSubmit={submitMessage} />
