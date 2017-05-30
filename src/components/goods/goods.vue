<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{current:index==currentIndex}" @click="selectMenu(index,$event)">
                    <span class="text border1px">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>

        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border1px" @click="selectFood(food,$event)">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now"><span class="dollar">￥</span>{{food.price}}</span><span v-show="food.oldPrice" class="old"><span class="dollar">￥</span>{{food.oldPrice}}</span>
                                </div>
                                <div class="cart-wrapper">
                                    <cart :food="food"></cart>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
        <food :food="selectedFood" ref="food"></food>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart'
import cart from '@/components/cart/cart'
import food from '@/components/food/food'
const err_ok = 0
export default {
    props: ['seller'],
    components: {
        shopcart,
        cart,
        food,
    },
    data() {
        return {
            goods: [],
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            listHeight: [],
            scrollY: 0,
            selectedFood:'',
            
        }
    },
    created() {
        this.$http.get('api/goods').then(response => {
            response = response.body
            if (response.errno === err_ok) {
                this.goods = response.data
                this.$nextTick(() => {
                    this._initScroll()
                    this._calculateHeight()
                })
            }
        })
    },
    methods: {
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            })

            this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
                probeType: 3,
                click:true,
            })

            this.foodScroll.on('scroll', pos => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calculateHeight() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
            let height = 0
            this.listHeight.push(height)
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        selectMenu(index, e) {
            if (!e._constructed) {
                return
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
            let el = foodList[index]
            this.foodScroll.scrollToElement(el, 100)
        },
        selectFood(food,e){
            if (!e._constructed) {
                return
            }
            this.selectedFood=food
            this.$refs.food.show()
        }
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i]
                let height2 = this.listHeight[i + 1]
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i
                }
            }
            return 0
        },
        selectFoods(){
            let foods=[]
            this.goods.forEach(good=>{
                good.foods.forEach(food=>{
                    if(food.count){
                        foods.push(food)
                    }                    
                })
            })
            return foods
        }
    }
}
</script>
<style lang="less">
.goods {
    position: absolute;
    top: 175px;
    bottom: 46px;
    width: 100%;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item {
            display: table;
            padding-left: 12px;
            height: 54px;
            width: 56px;
            line-height: 14px;
            &.current {
                padding-left: 9px;
                padding-right: 12px;
                background: #fff;
                font-weight: 700;
                border-left: 3px solid rgb(0,160,220);
                .text {
                    border: none;
                }
            }
        }
        .text {
            display: table-cell;
            width: 56px;
            vertical-align: middle;
            font-size: 12px;
        }
        .icon {
            position: relative;
            top: 1px;
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            -webkit-background-size: 12px 12px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
        }
        .decrease {
            background-image: url("decrease_3@2x.png");
        }
        .discount {
            background-image: url("discount_3@2x.png");
        }
        .guarantee {
            background-image: url(guarantee_3@2x.png);
        }
        .special {
            background-image: url(special_3@2x.png);
        }
        .invoice {
            background-image: url(invoice_3@2x.png);
        }
    }
    .foods-wrapper {
        flex: 1;
        .title {
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147, 153, 159);
            background: #f3f5f7;
        }
        .food-item {
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flex;
            display: -o-flex;
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            &:last-child {
                margin-bottom: 0;
            }
            &.border1px:last-child:after {
                border: none;
            }
            .icon {
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content {
                flex: 1;
                .name {
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .desc,
                .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                    .count {
                        margin-right: 12px;
                    }
                }
                .desc {
                    margin-bottom: 8px;
                    line-height: 12px;
                }
                .price {
                    font-weight: 700;
                    line-height: 24px;
                    .now {
                        color: rgb(240, 20, 20);
                        margin-right: 8px;
                        font-size: 14px;
                        .dollar {
                            font-size: 10px;
                            font-weight: normal;
                        }
                    }
                    .old {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        text-decoration: line-through;
                    }
                }

                .cart-wrapper{
                    position: absolute;
                    right: 0;
                    bottom: 12px;
                }
            }
        }
    }
}
</style>
