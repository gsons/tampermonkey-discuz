<script setup lang="ts">
import { store } from '../lib/Store';


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
    <a class="vo-item" :href="href" :target="store.is_mobile?'_self':'_blank'">
        <div class="img">
            <img :id="'vo-item-img-' + index"  :src="pre_image_link" alt="" :style="{height:((width||150)/img_rate)+'px'}">
        </div>
        <div class="text" :id="'vo-item-p-' + index">
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
            opacity:0.1
        }
    }

    .text { 
        p {
            color: #FFF;
            opacity:0.1
        }
    }
}
</style>