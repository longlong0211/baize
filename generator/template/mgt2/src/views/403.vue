<template>
  <div class="error_page">
    <div class="error_code">4<span>0</span>3</div>
    <div class="error_desc">暂无权限</div>
  </div>
</template>

<script>
export default {
  name: '403'
}
</script>

<style lang="less">
  .error_page{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #F8F8F8;
    box-sizing: border-box;
    padding-top: 150px;
    position: relative;
    top: -40px;
    .error_code{
      line-height: 1;
      font-size: 250px;
      font-weight: bolder;
      color: #2d8cf0;
      span{
        color: #00a854;
      }
    }
    .error_desc{
      font-size: 30px;
      color: #777;
    }
  }
</style>
