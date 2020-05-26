<template>
  <div class="home">
    <img alt="logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 380px;
  }
}
</style>
