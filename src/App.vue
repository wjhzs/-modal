<template>
  <div id="app">
    <button @click="open">Open Modal</button>
  </div>
</template>

<script>
import { messageBox } from "./components/Modal";

export default {
  name: "App",
  methods: {
    open() {
      messageBox({
        title: "Basic Modal",
        content: "Some contents...",
        cancel: "取消",
        ok: "确定",
        handleCancel(){
          console.log("您点击取消了");
        },
        handleOk() {
          console.log("您点击确认了");
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  position: relative;
  button {
    width: 100px;
    height: 40px;
    border: none;
    background: #4c99fc;
    text-align: center;
    line-height: 40px;
    outline: none;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
