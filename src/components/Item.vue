<script setup lang="ts">

export interface ArticleDto {
    title: string,
    image_link: string,
    pre_image_link: string,
    href: string
    loaded?:boolean
}

defineProps<ArticleDto>();
</script>

<template>
    <a class="vo-item" :href="href">
        <div class="img">
            <img :src="pre_image_link" alt="">
        </div>
        <div class="text">
            <p>
                {{ title }}
            </p>
        </div>
    </a>
</template>


<style lang="scss">
.vo-item {
    text-decoration: none;
    display: block;
    border-radius: 5px;
    overflow: hidden;
    .img {
        img {
            display: block;
            width: 100%;
            opacity:0.01
        }
    }

    .text {
        p {
            color: #FFF;
            opacity:0.01
        }
    }
}
</style>