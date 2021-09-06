<!--
 * @Description:
 * @Version: 1.00
 * @Autor: songTeng
 * @Date: 2021-08-24 14:11:18
 * @LastEditors: songTeng
 * @LastEditTime: 2021-09-06 14:58:48
-->
<template>
  <div id="app">
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/sign">sign</router-link> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
