<template>
    <div class="header">
        <div class="content-wrapper" @click="toggleSeller">
            <div class="avatar">
                <img :src="seller.avatar" alt="avatar" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}} / {{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click.stop="showDetail">
                <span class="count">{{seller.supports.length}}个活动</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="notice-wrapper" @click.stop="showDetail">
            <span class="notice-title"></span><span class="notice-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow" key="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item,index) in seller.supports">
                                <span class="icon" :class="classMap[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="notice">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="showDetail">
                    <i class="icon-close"></i>
                </div>
            </div>            
        </transition>
    </div>
</template>
<script>
import star from '@/components/star/star'
export default {
    props: ['seller'],
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    data() {
        return {
            detailShow: false,
        }
    },
    methods: {
        showDetail() {
            this.detailShow = !this.detailShow
        },
        toggleSeller(){
            this.$emit('toggleSeller')}
    },
    components: {
        star
    }
}
</script>
<style lang="less">
@import "../../common/less/icon";
.header {
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    position: relative;
    overflow: hidden;
    .content-wrapper {
        padding: 24px 12px 18px 24px;
        font-size: 0;
        position: relative;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            font-size: 14px;
        }
        .title {
            margin: 2px 0px 8px 0px;
        }
        .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            vertical-align: top;
            background-image: url(brand@2x.png);
            -webkit-background-size: 30px 18px;
            background-size: 30px 18px;
            background-repeat: no-repeat;
        }
        .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
        }
        .description {
            margin-bottom: 10px;
            line-height: 12px;
            font-size: 12px;
        }
        .icon {
            position: relative;
            top: 1px;
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            -webkit-background-size: 12px 12px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
        }
        .decrease {
            background-image: url("decrease_1@2x.png");
        }
        .discount {
            background-image: url("discount_1@2x.png");
        }
        .guarantee {
            background-image: url(guarantee_1@2x.png);
        }
        .special {
            background-image: url(special_1@2x.png);
        }
        .invoice {
            background-image: url(invoice_1@2x.png);
        }
        .text {
            line-height: 12px;
            font-size: 10px;
        }
        .support-count {
            position: absolute;
            bottom: 15px;
            right: 18px;
            padding: 0px 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background: rgba(0, 0, 0, 0.2);
            text-align: center;
            .count {
                font-size: 10px;
            }
            .icon-keyboard_arrow_right {
                font-size: 10px;
                line-height: 24px;
                margin-left: 2px;
            }
        }
    }
    .notice-wrapper {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0px 22px 0px 12px;
        white-space: nowrap;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        background-color: rgba(7, 17, 27, 0.2);
        .notice-title {
            display: inline-block;
            vertical-align: top;
            margin-top: 7px;
            width: 22px;
            height: 12px;
            background-image: url(bulletin@2x.png);
            -webkit-background-size: 22px 12px;
            background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .notice-text {
            font-size: 10px;
            margin: 0px 4px;
            vertical-align: top;
        }
        .icon-keyboard_arrow_right {
            position: absolute;
            right: 12px;
            top: 8px;
            font-size: 10px;
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        filter: blur(10px);
    }
    .detail {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(7, 17, 27, 0.8);
        backdrop-filter:blur(10px);
        .detail-wrapper {
            min-height: 100%;
            width: 100%;
            .detail-main {
                margin-top: 64px;
                padding-bottom: 64px;
                .name {
                    line-height: 16px;
                    font-size: 16px;
                    font-weight: 700;
                    text-align: center;
                }
                .star-wrapper {
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }
                .title {
                    display: -webkit-flex;
                    display: -moz-flex;
                    display: -ms-flex;
                    display: -o-flex;
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px;
                    .line {
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    .text {
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
                .supports {
                    width: 80%;
                    margin: 0 auto;
                    .support-item {
                        padding: 0 12px;
                        margin-bottom: 12px;
                        font-size: 0;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .icon {
                            position: relative;
                            top: -2px;
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            margin-right: 6px;
                            -webkit-background-size: 16px 16px;
                            background-size: 16px 16px;
                            background-repeat: no-repeat;
                            vertical-align: top;
                        }
                        .decrease {
                            background-image: url("decrease_2@2x.png");
                        }
                        .discount {
                            background-image: url("discount_2@2x.png");
                        }
                        .guarantee {
                            background-image: url(guarantee_2@2x.png);
                        }
                        .special {
                            background-image: url(special_2@2x.png);
                        }
                        .invoice {
                            background-image: url(invoice_2@2x.png);
                        }
                        .text {
                            line-height: 12px;
                            font-size: 12px;
                            font-weight: 200;
                        }
                    }
                }
                .notice {
                    width: 80%;
                    margin: 0 auto;
                    .content {
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                }
            }
        }
        .detail-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0;
            font-size: 32px;
        }
        &.fade-enter,&.fade-leave-active{
            opacity: 0;            
        }
        &.fade-enter-active,&.fade-leave-active{
            transition: opacity 0.5s; 
        }
    }
}
</style>
