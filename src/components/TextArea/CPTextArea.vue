<template>
    <div>
        <v-textarea
            v-model="text"
            :rows="rows"
            :label="label"
            :outlined="outlined"
        ></v-textarea>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: 'Textarea'
        },
        outlined: {
            type: Boolean,
            default: true 
        },
        rows: {
            type: Number,
            default: 3 
        }
    },
    data() {
        return {
            text: ''
        }
    },
    computed: {
        value: {
            get() {
                return this.text;
            },
            set(newValue) {
                this.text = newValue;
            }
        }
    }
}
</script>