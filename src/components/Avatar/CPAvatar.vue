<template>
    <div>
        <v-avatar :size="size" :image="photoUrl" color="#ccc" ></v-avatar>
      
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
        previewImage(event) {
            console.log('File selected'); // Adicione esta linha
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