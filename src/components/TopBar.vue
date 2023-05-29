<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import DocumentationIcon from '../icons/IconDocumentation.vue'
import ToolingIcon from '../icons/IconTooling.vue'
import EcosystemIcon from '../icons/IconEcosystem.vue'
import CommunityIcon from '../icons/IconCommunity.vue'
import SupportIcon from '../icons/IconSupport.vue'
import { store } from '../lib/Store'

let key=ref<string>('');

function doSearch(){
    const t=+new Date();
    location.hash=`key=${key.value}_=${t}`;
}

watch(store,()=>{
     key.value=decodeURIComponent(store.key);
});


</script>

<template>
    <div class="top-bar">
        <div class="logo">
            <img alt="Vue logo" class="logo" src="https://www.cunhua.click/template/bygsjw/image/logo.png" />
        </div>
        <div class="search-bar">
            <div class="bar">
                <div class="input">
                    <input type="search" v-model="key" @keyup.enter="doSearch()" placeholder="请输入关键词搜索。。。">
                </div>
                <button @click="doSearch()">
                    <SupportIcon class="icon" />
                    搜索帖子
                </button>
            </div>
        </div>
        <div class="tool">
            <ToolingIcon class="icon"/>
            <SupportIcon class="icon" />
            <CommunityIcon class="icon" />
            <EcosystemIcon class="icon" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.top-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 50px;
    background: #3a3c40;
    // background-color: #191919;
    display: flex;

    .logo {
        flex: 1;
        padding-left: 0px;

        img {
            // width: 50px;
            height: 50px;
            display: block;
            padding: 10px;
        }
    }

    .search-bar {
        width: 500px;
        padding-left: 10px;

        .bar {
            width: 490px;
            margin: 8px 0;
            padding-left: 17px;
            border-radius: 17px;
            background-color: #2b2c2f;
            display: flex;

            .input {
                flex: 1;

                input {
                    width: 100%;
                    background-color: #2b2c2f;
                    height: 34px;
                    outline: none;
                    border: none;
                    color: #FFF;
                }
            }

            button {
                display: flex;
                justify-content: center;
                cursor: pointer;
                align-items: center;

                &:active {
                    background: #3a3c3f;
                }

                width:100px;
                height: 30px;
                margin: 2px;
                border: none;
                font-size: 12px;
                outline: none;
                border-radius: 15px;
                cursor: pointer;
                background-color: #4a4b4e;
                color: #FFF;

                .icon {
                    display: inline-block;
                    scale: .6;
                }
            }
        }
    }



    .tool {
        flex: 1;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        margin-right: 20px;

        .icon {
            margin-left: 15px;
            color: #EEE;
            scale: .9;
        }
    }

    @media (max-width: 768px) {
        .search-bar {
            width: 300px;

            .bar {
                width: 290px;
            }
        }
        .tool {
            display: none;
        }
    }
}
</style>
