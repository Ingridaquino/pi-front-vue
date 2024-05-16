<template>
    <div class="avatar-box">
      <input type="file" ref="fileInput" style="display: none" @change="previewImage">
      <v-avatar :size="size" :image="photoUrl" color="#ccc" @click="openFileInput"></v-avatar>
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
      }
    },
    methods: {
      openFileInput() {
        this.$refs.fileInput.click();
      },
      async previewImage(event) {
        console.log('File selected');
        const file = event.target.files[0];
        this.photoUrl = URL.createObjectURL(file); 
        this.uploadPhoto(file);
      },
      async uploadPhoto(file) {
        const formData = new FormData();
        formData.append('photo', file);
  
        try {
          const response = await fetch('API_URL', {
            method: 'POST',
            body: formData
          });
  
          if (response.ok) {
            const data = await response.json();
            this.$nextTick(() => {
              this.photoUrl = data.photoUrl; 
            });
          } else {
            console.error('Failed to upload photo');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  </script>
  
  

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