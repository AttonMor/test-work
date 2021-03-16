<template>
  <div class="source">
    <h3><a :href="source.url" target="example">{{ source.filename }}</a></h3>
    <p>{{ source.size }}</p>
  </div>
</template>

<script>
export default {
  name: "Source",
  props: {
    source: Object,
  },
};
</script>

<style scope>
.source {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
}
.source h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>