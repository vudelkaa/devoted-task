<script setup>
defineProps({
  post: {
    type: Object,
    require: true,
  },
});
</script>

<template>
  <div class="post-item">
    <div class="post-item__general-info">
      <h3 class="title">{{ post.title }}</h3>
      <span class="date"
        >{{ new Date(post.date).getHours() }}:{{
          new Date(post.date).getMinutes() < 10
            ? '0' + new Date(post.date).getMinutes()
            : new Date(post.date).getMinutes()
        }}
      </span>
    </div>

    <div class="post-item__author">
      <span>Author: {{ post.authorName }}</span>
    </div>

    <p class="post-item__text">{{ post.text }}</p>

    <div class="post-item__tags">
      <span class="post-item__tags-title">Tags: </span>
      <ul>
        <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h3 {
  margin: 0;
}

.date,
.post-item__author {
  color: grey;
  font-size: 14px;
}

.post-item {
  border-bottom: 1px solid lightgrey;

  padding: 25px 0;
}

.post-item:last-of-type {
  border-top: 1px solid lightgrey;
}

.post-item__general-info {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 8px;
}

.post-item__text {
  margin: 25px 0;
}

.post-item__tags {
  display: flex;
  align-items: center;
}

.post-item__tags-title {
  font-weight: bold;
  margin-right: 8px;
}
.post-item__tags ul {
  display: flex;
  margin: 0;
  padding: 0;
}
.post-item__tags li {
  list-style: none;

  padding: 4px 8px;
  margin: 0 8px;

  border: 1px solid orange;
  border-radius: 12px;
}
</style>
