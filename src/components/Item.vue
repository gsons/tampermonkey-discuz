<script setup lang="ts">

export interface ArticleDto {
    width?:number,
    title: string,
    image_link: string,
    pre_image_link: string,
    img_rate:number,
    href: string
    loaded?:boolean
    index?:number
}

defineProps<ArticleDto>();
</script>

<template>
    <a class="vo-item" :href="href">
        <div class="img">
            <img :src="pre_image_link" alt="" :style="{height:((width||150)/img_rate)+'px'}">
        </div>
        <div class="text" :id="'vo-item-img-' + index">
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
            opacity:1
        }
    }

    .text { 
        p {
            color: #FFF;
            opacity:1
        }
    }
}
</style>