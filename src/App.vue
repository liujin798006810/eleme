<template>
    <div>
        <vheader :seller="seller" @toggleSeller="showSeller"></vheader>
        <div class="tab border1px">
            <div class="tab-item" @click="lineRight=false">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item" @click="lineRight=true">
                <router-link to="/ratings">评价</router-link>
            </div>
            <transition name='line'>
                <div class="bot-line" :class="{ lineright: lineRight }"></div>
            </transition>
        </div>
        <transition>
            <seller v-show="sellerShow" :seller="seller" @toggleSeller="showSeller" ref="seller"></seller>
        </transition>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>
</template>
<script>
import vheader from '@/components/header/header'
import seller from '@/components/seller/seller'
const err_ok = 0
export default {
    data() {
            return {
                seller: {},
                lineRight: false,
                sellerShow: false,
            }
        },
        components: {
            vheader,
            seller
        },
        created() {
            this.$http.get('/api/seller').then(response => {
                response = response.body
                if (response.errno === err_ok) {
                    this.seller = response.data
                }
            })
        },
        methods: {
            showSeller() {
                this.sellerShow = !this.sellerShow
            },
            showSeller() {
                this.sellerShow = !this.sellerShow
                this.$nextTick(() => {
                    this.$refs.seller._initScroll()
                    this.$refs.seller._initPics()

                })
            }
        }
}
</script>
<style lang="less">
.tab {
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    .bot-line {
        width: 50%;
        height: 3px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #00a0dc;
        transition: transform 0.4s ease-out;
    }
    .lineright {
        transform: translate3d(100%, 0, 0);
    }
}

.tab-item {
    flex: 1;
    text-align: center;
}

.tab-item a {
    display: block;
    line-height: 40px;
    font-size: 14px;
    color: rgb(77, 85, 93);
}

.tab-item a.router-link-active {
    color: rgb(240, 20, 20);
}

.border1px {
    position: relative;
}

.border1px::after {
    position: absolute;
    display: block;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: '';
}

@media (-webkit-min-device-pixel-ratio:1.5),
(min-device-pixel-ratio:1.5) {
    .border1px::after {
        -webkit-transform: scaleY(0.7);
        transform: scaleY(0.7);
    }
}

@media (-webkit-min-device-pixel-ratio:2),
(min-device-pixel-ratio:2) {
    .border1px::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}
</style>
