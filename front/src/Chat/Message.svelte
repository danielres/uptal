<script>
  import { distanceInWords, format } from "date-fns";
  export let message;
</script>

<div>
  <div>
    <small title={format(new Date(message.createdAt), 'MM/DD/YYYY HH:mm:ss')}>
      {distanceInWords(new Date(message.createdAt), new Date())} ago by
    </small>
    {message.author}
  </div>
  {message.text}
</div>
