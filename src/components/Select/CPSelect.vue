<template>
    <v-select
        v-model="selectedOption"
        :items="options"
        :label="label"
        @change="handleSelectChange"
        variant="outlined"
    ></v-select>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            default: 'Select an option'
        }
    },
    data() {
        return {
            selectedOption: null
        };
    },
    methods: {
        handleSelectChange() {
            this.$emit('selected', this.selectedOption);
        }
    }
};
</script>