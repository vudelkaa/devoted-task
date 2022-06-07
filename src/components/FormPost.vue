<script setup>
import { inject, reactive, ref } from 'vue';

import { addPost } from '@/PostService.js';

const props = defineProps({
  tags: {
    type: Array,
    default: [],
  },
});

const newPost = reactive({
  authorName: '',
  title: '',
  text: '',
  tags: [],
});

const isUploading = ref(false),
  isWarning = ref(false);

const updatePosts = inject('updatePosts');

const handleSubmit = async () => {
  if (
    !newPost.authorName ||
    !newPost.title ||
    !newPost.text ||
    !newPost.tags.length
  ) {
    isWarning.value = true;

    return;
  }

  isWarning.value = false;

  isUploading.value = true;

  const data = await addPost(newPost);
  updatePosts(data);

  newPost.authorName = '';
  newPost.title = '';
  newPost.text = '';
  newPost.tags = [...[]];

  isUploading.value = false;
};
</script>

<template>
  <div class="form">
    <div class="author">
      <label for="author-post">Your name</label>
      <input
        id="author-post"
        type="text"
        v-model="newPost.authorName"
        placeholder="Type your name here"
      />
    </div>

    <div class="title">
      <label for="title-post">Post title</label>
      <input
        id="title-post"
        type="text"
        v-model="newPost.title"
        placeholder="Type your name here"
      />
    </div>

    <div class="tags-checkbox" v-if="props.tags.length">
      <span class="tags-title">Choose tags:</span>
      <div class="tags-checkbox__container">
        <div class="tags-checkbox__item" v-for="tag in props.tags">
          <input
            type="checkbox"
            name="tags"
            :value="tag.toLowerCase()"
            :id="`tag-${tag.toLowerCase()}`"
            v-model="newPost.tags"
          />
          <label :for="`tag-${tag.toLowerCase()}`">{{ tag }}</label>
        </div>
      </div>
    </div>

    <div class="text">
      <label for="text-post">Post text</label>
      <textarea
        id="text-post"
        v-model="newPost.text"
        placeholder="Type your text here"
      ></textarea>
    </div>
    <div class="button">
      <div class="button__waring" v-if="isWarning">
        All fields must be filled!
      </div>
      <button type="button" @click="handleSubmit">Add new post</button>
    </div>
  </div>

  <div class="uploading" v-if="isUploading">adding new post...</div>
</template>

<style scoped>
.form > div {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #000;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #6200ee;
}

textarea {
  height: 180px;
  resize: none;
}

.tags-checkbox label {
  display: inline;
}

.tags-checkbox__container {
  display: flex;
  flex-wrap: wrap;
}

.tags-checkbox__item {
  margin-right: 20px;
  margin-bottom: 10px;
}

.tags-checkbox__item input {
  width: auto;
  margin-right: 8px;
}

.tags-title {
  display: block;
  margin-bottom: 8px;
}

.button {
  position: relative;
  text-align: center;
}

.button__waring {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 150%);

  color: #b00020;
  font-size: 12px;
}

button {
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #000;

  padding: 8px 12px;

  cursor: pointer;
  transition: all 0.2s linear;
}

button:hover {
  color: #6200ee;
  border-color: #6200ee;
}

button:active {
  border-color: #6200ee;
  background-color: #6200ee;
  color: #fff;
}
</style>
