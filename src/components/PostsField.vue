<script setup>
import { provide, ref } from 'vue';
import PostItem from './PostItem.vue';
import FormPost from './FormPost.vue';

import { getPosts } from '../PostService';

const posts = ref([]);
const tags = ['Animals', 'IT', 'Food', 'News', 'Art'];

posts.value = await getPosts();

const updatePosts = (newPost) => {
  posts.value = [...posts.value, newPost];
};

provide('updatePosts', updatePosts);

const showPostsByTag = async (tag, { target }) => {
  Array.from(document.querySelectorAll('.tag')).forEach((item) => {
    item.classList.remove('active');
  });

  target.classList.add('active');

  let params = tag !== 'all' ? `q=${tag}` : '';
  posts.value = await getPosts(params);
};
</script>

<template>
  <div class="posts-field">
    <div class="posts-field__item-1">
      <h2>Create new post</h2>
      <FormPost :tags="tags" />
    </div>

    <div class="posts posts-field__item-2">
      <div class="posts__tags">
        <span class="title">Tags:</span>
        <ul>
          <li class="tag active" @click="showPostsByTag('all', $event)">All</li>
          <li
            v-for="tag in tags"
            :key="tag"
            @click="showPostsByTag(tag, $event)"
            class="tag"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
      <div class="posts__items" v-if="posts.length">
        <PostItem v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <div v-else class="no-posts">
        There are no posts yet! :( <br />
        Create the new one! <br />
        <span class="no-posts__arrow">←</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 20px;
}

.posts-field {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.posts-field__item-1 {
  grid-column: 1 / 2;
  margin: 0 25px 25px;
}

.posts-field__item-2 {
  grid-column: 2 / 3;
}

.posts {
  margin: 0 25px 25px 30px;
  padding-left: 50px;
  border-left: 1px solid lightgray;
}

.posts__tags {
  display: flex;
  align-items: center;
}
.posts__tags ul {
  display: flex;
  width: fit-content;
  padding: 0;
}

.posts__tags li {
  list-style: none;
  margin: 10px 8px;

  cursor: pointer;
  transition: color 0.2s linear;
}

.posts__tags li:hover {
  color: orange;
}

.tag.active {
  color: orangered;
}

.tag.active::after {
  content: '';
  display: block;
  height: 2px;
  width: inherit;
  background-color: orangered;
}

.posts__tags span {
  font-weight: bold;
  margin-right: 15px;
}

.posts__items {
  display: flex;
  flex-direction: column-reverse;
}
.no-posts {
  display: flex;
  align-items: center;

  flex-direction: column;
  text-align: center;

  margin: 45px 0;
  padding: 35px 45px;
  font-size: 20px;
}

.no-posts__arrow {
  display: block;
  font-size: 50px;
  margin-top: 15px;

  color: #b00020;
}
</style>
