<template>
  <router-view/>
</template>

<style lang="scss">
html, body {
  height: 100%;
}
body {
  margin: 0;
  display: flex;
  flex-direction: column;
}
.clear-fix {
  &::before, &::after {
    content: '';
    display: table;
  }
  &::after {
    clear: both;
  }
}
</style>
