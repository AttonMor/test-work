<template>
<div class="sources-form">
  <div :key="source.url" v-for='source in sources'>
    <Source :source='source'/>
  </div>
  </div>
</template>

<script>
import Source from './Source'
export default {
    name: 'Sources',
    props: {
      sources: Array
    },
    components: {
      Source
    }
}
</script>

<style scoped>
sources {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sources-form{
  margin-top: 20px;
}
</style>