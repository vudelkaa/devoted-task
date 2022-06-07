<script setup>
import PostsField from './components/PostsField.vue';
</script>

<template>
  <header>
    <h1>Oh my POSTS</h1>
  </header>

  <main>
    <Suspense>
      <template #default>
        <PostsField />
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </main>
</template>

<style>
/* @import './assets/base.css'; */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  color: #000;

  background-color: #fff;
}

h1 {
  font-size: 26px;

  margin: 25px 0 25px 25px;
  color: #6200ee;
}

textarea {
  font-family: 'Roboto', sans-serif;
}
</style>
