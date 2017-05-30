<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class='{highlight:totalCount>0}'>
                            <span class="icon-shopping_cart"></span>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class='{highlight:totalCount>0}'>￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click="pay($event)">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <transition name="list">
                <div class="shop-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">已选商品</h1>
                        <span class="clear" @click="clearList">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food border1px" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cart-wrapper">
                                    <cart :food="food"></cart>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="back-fade">
            <div class="list-back" v-show="listShow" @click="toggleList">
            </div>
        </transition>
    </div>
</template>
<script>
import cart from '@/components/cart/cart'
import BScroll from 'better-scroll'
export default {
    props: ['deliveryPrice', 'minPrice', 'selectFoods'],
    data() {
        return {
            fold: true
        }
    },
    computed: {
        totalPrice() {
            let total = 0
            this.selectFoods.forEach(food => {
                total += food.price * food.count
            })
            return total
        },
        totalCount() {
            let count = 0
            this.selectFoods.forEach(food => {
                count += food.count
            })
            return count
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice || ''}元起送`
            } else if (this.totalPrice < this.minPrice) {
                return `还差￥${this.minPrice-this.totalPrice}元起送`
            } else {
                return '去结算'
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough'
            } else {
                return 'enough'
            }
        },
        listShow() {
            if (!this.totalCount) {
                return false
            }
            let show = !this.fold
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh()
                    }
                })
            }

            return show
        }
    },
    methods: {
        toggleList() {
            if (this.totalCount) {
                this.fold = !this.fold
            }
        },
        clearList() {
            this.selectFoods.forEach(food => food.count = 0)
        },
        pay(e) {
            if (this.totalPrice < this.minPrice) {
                return
            } else {
                let pay = this.totalPrice + this.deliveryPrice
                alert(`支付${pay}元!`)
                e.stopPropagation()
            }
        }
    },
    components: {
        cart,
    }
}
</script>
<style lang="less">
.shopcart {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
        display: flex;
        background: #141d27;
        color: rgb(147, 145, 150);
        .content-left {
            flex: 1;
            .logo-wrapper {
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                vertical-align: top;
                border-radius: 50%;
                background: #141d27;
                .logo {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    background: #2b343c;
                    border-radius: 50%;
                    &.highlight {
                        background: rgb(0, 160, 220);
                        .icon-shopping_cart {
                            color: #fff;
                        }
                    }
                    .icon-shopping_cart {
                        line-height: 44px;
                        font-size: 24px;
                        color: #80858a;
                    }
                }
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background: rgb(240, 20, 20);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                }
            }
            .price {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-weight: 700;
                &.highlight {
                    color: #fff;
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: 10px;
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                font-weight: 700;
                background: #2b333b;
                &.enough {
                    background: #00b43c;
                    color: #fff;
                }
            }
        }
    }
    .shop-list {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        background: #fff;
        transform: translate3d(0, -100%, 0);
        .list-header {
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .title {
                float: left;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .clear {
                float: right;
                font-size: 12px;
                color: rgb(0, 160, 220);
            }
        }
        .list-content {
            padding: 0 18px;
            max-height: 217px;
            overflow: hidden;
            .food {
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
                .name {
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .price {
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .cart-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 6px;
                }
            }
        }
    }
    .list-enter,
    .list-leave-active {
        transform: translate3d(0, 0, 0)
    }
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s;
    }
}

.list-back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.6);
}

.back-fade-enter,
.back-fade-leave-active {
    opacity: 0;
}

.back-fade-enter-active,
.back-fade-leave-active {
    transition: all 0.3s;
}
</style>
