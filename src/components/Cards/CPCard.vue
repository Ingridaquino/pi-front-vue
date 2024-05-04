<template>
    <div class="card" :style="{ width: widthValue }">
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    name: 'CPCard',
    props: {
        size: {
            type: String,
            default: 'medium',
            validator: (value) => ['small', 'medium', 'large'].includes(value)
        },
        width: {
            type: String,
            default: 'auto'
        }
    },
    computed: {
        cardSizeClass() {
            return `card--${this.size}`;
        },
        widthValue() {
            return this.width;
        }
    }
}
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 30px;
    border-radius: 4px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.card--small {
    font-size: 12px;
}

.card--medium {
    font-size: 16px;
}

.card--large {
    font-size: 20px;
}
</style>