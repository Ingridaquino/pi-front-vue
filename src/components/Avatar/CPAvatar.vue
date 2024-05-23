<template>
  <div class="avatar-box">
    <input type="file" ref="fileInput" style="display: none" @change="previewImage">
    <v-avatar :size="size" :image="photoUrl" color="#ccc" @click="openFileInput" v-if="photoUrl"></v-avatar>
    <v-icon size="50" v-else>mdi-account-circle</v-icon>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photoUrl: '',
    };
  },
  props: {
    size: {
      type: [String, Number],
      default: 'small'
    },
  },
  created() {
    this.loadPhotoFromLocalStorage();
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.photoUrl = e.target.result;
          localStorage.setItem('photoUrl', this.photoUrl)
        };
        reader.readAsDataURL(file);
      }
    },
    loadPhotoFromLocalStorage() {
      const savedPhotoUrl = localStorage.getItem('photoUrl');
      if (savedPhotoUrl) {
        this.photoUrl = savedPhotoUrl;
      }
    }
  },
};
</script>

<style scoped>
.avatar-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

  
  

<style>
.avatar-box {
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>