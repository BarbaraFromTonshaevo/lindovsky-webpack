<script>
import noUiSlider from 'nouislider';
export default {
    props: ['params'],
    methods: {
        updateAreaSlider() {
            this.$refs.areaSlider.noUiSlider.on(
                "update",
                (e, values, handle) => {
                    let min = Math.round(e[0]);
                    let max = Math.round(e[1]);
                    if (!isNaN(min) && !isNaN(max)) {
                        // this[handle ? "maxRange" : "minRange"] = parseInt(values[handle]);
                        this.currentAreaMin = new Intl.NumberFormat(
                            "ru-RU"
                        ).format(min);
                        this.currentAreaMax = new Intl.NumberFormat(
                            "ru-RU"
                        ).format(max);
                    }
                }
            )
        },
        updatePriceSlider() {
            this.$refs.priceSlider.noUiSlider.on(
                "update",
                (e, values, handle) => {
                    let min = Math.round(e[0]);
                    let max = Math.round(e[1]);
                    if (!isNaN(min) && !isNaN(max)) {
                        // this[handle ? "maxRange" : "minRange"] = parseInt(values[handle]);
                        this.currentPriceMin = new Intl.NumberFormat(
                            "ru-RU"
                        ).format(min);
                        this.currentPriceMax = new Intl.NumberFormat(
                            "ru-RU"
                        ).format(max);
                    }
                }
            )
        },
        changeScheme(corpus){
            console.log(corpus);
        }
    },
    mounted() {
        noUiSlider
        .create(this.$refs.areaSlider, {
            start: [this.params.area.startMin, this.params.area.startMax],
            step: this.params.area.step,
            connect: true,
            range: {
                min: this.params.area.min,
                max: this.params.area.max,
            },
        });
        this.updateAreaSlider();

        noUiSlider
        .create(this.$refs.priceSlider, {
            start: [this.params.price.startMin, this.params.price.startMax],
            step: this.params.price.step,
            connect: true,
            range: {
                min: this.params.price.min,
                max: this.params.price.max,
            },
        });
        this.updatePriceSlider();
    },
    data: function () {
        return {
          currentRooms: [],
          currentParams: [],
          currentAreaMin: this.params.area.min,
          currentAreaMax: this.params.area.max,
          currentPriceMin: this.params.price.min,
          currentPriceMax: this.params.price.max,
          currentCorpus: [],
        }
    },
    watch: {
        currentRooms(value) {
            console.log(value);
        },
    },
}
</script>

<template>
    <div class="flats-filter"> 
        <button class="flats-filter__btn">Фильтры</button>
        <div class="flats-filter__wrap">
            <button class="flats-filter__close el-close"></button>
            <form action="#">
                <div class="flats-filter__form">
                <div class="flats-filter__corpus"> 
                    <div class="flats-filter__title">Корпус</div>
                    <div v-if="params.isScheme"> 
                        <button class="flats-filter__corpus-btn" v-for="corpus in params.corpus" @click="changeScheme(corpus)">
                            {{corpus}}
                        </button>
                    </div>
                    <div class="flats-filter__corpus-wrap" v-else>
                        <div class="form-item" v-for="corpus in params.corpus"> 
                            <input type="checkbox" v-bind:value="corpus" v-bind:id="'corpus-' + corpus" v-model="currentCorpus">
                            <label v-bind:for="'corpus-' + corpus">{{ corpus }}</label>
                        </div>
                    </div>
                </div>
                <div class="flats-filter__rooms">
                    <div class="flats-filter__title">Количество комнат</div>
                    <div class="flats-filter__rooms-wrap"> 
                        <div class="form-item" v-for="room in params.rooms">
                            <input type="checkbox" v-bind:value="room" v-bind:id="'room-' + room" v-model="currentRooms">
                            <label v-bind:for="'room-' + room">{{ room }}</label>
                        </div>
                    </div>
                </div>
                <div class="flats-filter__price">
                    <div class="flats-filter__title">Стоимость (руб.)</div>
                    <div class="flats-filter__price-wrap">
                        <div class="filter-slider" style="height: 60px">
                            <div class="filter-slider-top" style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                                <span class="filter-slider-from">от
                                    <input class="filter-slider-from-value" v-model="currentPriceMin"/>
                                </span>
                                <span class="filter-slider-to">до
                                    <input class="filter-slider-to-value" v-model="currentPriceMax"/>
                                </span>
                            </div>
                            <div class="filter-slider-line" ref="priceSlider"></div>
                        </div>            
                    </div>
                </div>
                <div class="flats-filter__area">
                    <div class="flats-filter__title">Площадь квартиры (м2)</div>
                    <div class="flats-filter__area-wrap"> 
                        <div class="filter-slider" style="height: 60px">
                            <div class="filter-slider-top" style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                                <span class="filter-slider-from">от
                                    <input class="filter-slider-from-value" v-model="currentAreaMin"/>
                                </span>
                                <span class="filter-slider-to">до
                                    <input class="filter-slider-to-value" v-model="currentAreaMax"/>
                                </span>
                            </div>
                            <div class="filter-slider-line" ref="areaSlider"></div>
                        </div>
                    </div>
                </div>
                <div class="flats-filter__params">
                    <div class="flats-filter__title">Количество комнат</div>
                    <div class="flats-filter__params-wrap"> 
                        <div v-for="(param, index) in params.params">
                            <input 
                            type="checkbox" 
                            v-bind:value="param"
                            v-bind:id="'param-' + index" 
                            v-model="currentParams"
                            >
                            <label v-bind:for="'param-' + index">{{ param }}</label>
                        </div>
                        </div>
                </div>
                <div class="flats-filter__reset">
                    <div> 
                    <input type="reset" value="Сбросить фильтр">
                    </div>
                </div>
                </div>
            </form>
            <div class="flats-filter__results">Посмотреть результаты</div>
        </div>
    </div>
</template>

