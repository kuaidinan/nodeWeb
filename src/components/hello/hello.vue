<template>
  <div class="hello">
    hello
  </div>
</template>
<script>
  import { getList } from '@/api/participant/index.js'
  import axios from 'axios'
  export default {
    mounted() {
      // getList().then((res) => {
      //   console.log(res)
      // });
      axios.get('/api/participant/getList')
          .then(function (response) {
              console.log(response);
          })
    }
  }
</script>


