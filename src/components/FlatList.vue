<script>
export default {
    props: ['list'],
    methods: {
        openPopup(flatItem){
            this.$emit('openPopup', flatItem);
        },
        rebuildParams(){
            const paramsElements = document.querySelectorAll('.params');
            let paramsWidth = document.querySelector('.flats-list__head-param').clientWidth;
            paramsElements.forEach((paramsEl) => {
                if(document.body.clientWidth >= 960){
                    if(paramsEl.clientWidth > paramsWidth){
                        const paramsBtn  = document.createElement('button');
                        paramsBtn.classList.add('params__btn');
                        const paramsWrap  = document.createElement('div');
                        paramsWrap.classList.add('params__wrap');
            
                        paramsWrap.innerHTML = paramsEl.innerHTML;
                        if(paramsEl.querySelector('ul li').clientWidth + 40 < paramsWidth){
                            paramsEl.querySelectorAll('ul li').forEach((item, index) => {
                                if(index !== 0){
                                    item.remove();
                                }
                            });
                            paramsWrap.querySelector('ul li').remove();
                        }else{
                            paramsEl.innerHTML = '';
                        }
                        paramsEl.append(paramsBtn);
                        paramsEl.append(paramsWrap);
                        if(document.body.clientWidth <= 1199){
                            paramsBtn.addEventListener('click', (e) => {
                                flitsList.querySelectorAll('.params__wrap.active').forEach(i => {
                                    i.classList.remove('active');
                                    i.style.opacity = 0;
                                })
                                e.preventDefault();
                                e.stopPropagation();
                                paramsWrap.style.opacity = 1;
                                paramsWrap.classList.add('active');
                                document.addEventListener('click', () => {
                                    paramsWrap.classList.remove('active');
                                    paramsWrap.style.opacity = 0;
                                })
                            })
                        }
                    }
                }
            })
        }
    },
    mounted() {
        this.rebuildParams();
    },
    data: function () {
        return {
            
        }
    },
    watch: {

    },
    created(){
    }
}
</script>

<template>
    <div class="flats-list__body">
        <div class="flats-list__empty" style="display: none">
            <div class="title">По вашему запросу ничего не найдено</div>
            <div class="subtitle">Попробуйте изменить параметры фильтров</div>
        </div>
        <div class="flats-list__head"> 
            <div class="flats-list__head-wrap">
                <div class="flats-list__head-title">Схема  </div>
                <div class="info-wrap">
                <div class="flats-list__head-title">Комнатность   </div>
                <div class="flats-list__head-title">Площадь </div>
                <div class="flats-list__head-title">Корпус</div>
                <div class="flats-list__head-title">Этаж  </div>
                </div>
                <div class="price-wrap">
                <div class="flats-list__head-title">Цена за м²   </div>
                <div class="flats-list__head-title">Стоимость   </div>
                </div>
            </div>
            <div class="flats-list__head-param"></div>
        </div>
        <ul class="flats-list__list">
            <li class="flats-list__item" v-for="flat in list">
                <div class="flats-list__link" @click="openPopup(flat)">
                    <div class="wrap">
                        <div class="img">
                            <picture>
                                <source srcset="" type="image/webp">
                                <img :src="flat.plan" alt="">
                            </picture>
                        </div>
                        <div class="info-wrap">
                            <div class="rooms">{{flat.rooms}}</div>
                            <div class="area">{{ Number(flat.area).toLocaleString('ru-RU') }} м²</div>
                            <div class="corpus">{{ flat.corpus }}</div>
                            <div class="floor">{{ flat.floor }}/{{ flat.floorsNumber }}</div>
                        </div>
                        <div class="price-wrap">
                            <div class="price-area">{{ Number(Math.trunc(flat.price / flat.area)).toLocaleString('ru-RU') }} руб/м²</div>
                            <div class="price">{{ Number(flat.price).toLocaleString('ru-RU') }} руб</div>
                        </div>
                    </div>
                    <div class="params">
                        <ul> 
                            <li v-for="param in flat.params">{{ param }}</li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
        <button class="flats-list__load-more">Загрузить ещё</button>
    </div>
</template>

