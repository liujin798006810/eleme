<template>
    <div class="cart">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCount($event)"></div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCount($event)" ref="cart">
            <transition-group name="drop" @beforeEnter="dropBefore" @enter="dropEnter" @afterEnter="dropAfter">
                <div class="ball" v-for="ball in balls" v-show="ball.show" key="dropBall">
                    <div class="inner"></div>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    props: ['food'],
    data() {
        return {
            balls: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            dropIndex: -1
        }
    },
    methods: {
        addCount(e) {
            if (!e._constructed) {
                return
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
            if (this.dropIndex === 4) {
                this.dropIndex = 0
            } else {
                this.dropIndex++
            }
            this.balls[this.dropIndex].show = true
        },
        decreaseCount(e) {
            if (!e._constructed) {
                return
            }
            if (this.food.count > 0) {
                this.food.count--
            }
        },
        dropBefore(el) {
            el.index = this.dropIndex
        },
        dropEnter() {
            let shopcart = document.getElementsByClassName('icon-shopping_cart')[0]
            let ball = this.$refs.cart.getElementsByClassName('ball')[this.dropIndex]
            let innerball = ball.firstChild
            let cartX = shopcart.getBoundingClientRect().left
            let cartY = shopcart.getBoundingClientRect().top
            let ballX = ball.getBoundingClientRect().left
            let ballY = ball.getBoundingClientRect().top
            let x = cartX - ballX
            let y = cartY - ballY
            ball.style.webkitTransform = `translate3d(${x}px,0,0)`
            innerball.style.webkitTransform = `translate3d(0,${y}px,0)`
        },
        dropAfter(el) {
            this.balls[el.index].show = false
            el.style.webkitTransform = ''
            el.firstChild.style.webkitTransform = ''
        }
    },
}
</script>
<style lang="less">
.cart {
    font-size: 0;
    .cart-decrease,
    .cart-add {
        display: inline-block;
        padding: 5px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        vertical-align: top;
    }
    .cart-count {
        padding: 5px 0;
        line-height: 24px;
        width: 18px;
        text-align: center;
        font-size: 10px;
        display: inline-block;
        vertical-align: top;
        color: rgb(147, 153, 159);
    }
    .move-enter,
    .move-leave-active {
        transform: translate3d(24px, 0, 0) rotate(180deg);
        opacity: 0;
    }
    .move-enter-active,
    .move-leave-active {
        transition: all 0.5s;
    }
    .ball {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
    }
    .drop-enter-active {
        transition: all 0.5s linear;
        .inner {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: rgb(0, 160, 220);
            transition: all 0.5s cubic-bezier(.06, -0.33, 1, -0.15);
        }
    }
}
</style>
