<script>
export default {
    props: ['popup'],
    methods: {
      openPopup(){
        setTimeout(()=>{
          this.$refs.popup.classList.add('active');
        }, 0)
        this.swiper = new Swiper(this.$refs.swiper,{
          speed: 1000,
          slidesPerView: 'auto',
          spaceBetween: 10,
          navigation: {
            nextEl: ".choose-flat__swiper-next",
            prevEl: ".choose-flat__swiper-prev",
          },
        })
      },
      closePopup(){
        this.$refs.popup.classList.remove('active');
        setTimeout(()=>{
          this.popup.isActive = false;
        }, 500);
        this.swiper.destroy();
      },
      changeImg(event){
        this.isPlan = !this.isPlan;
        document.querySelector('.tabs-btns__item.active').classList.remove('active');
        event.target.classList.add('active');

        document.querySelector('.tabs-body.active').classList.remove('active');
        document.querySelector('.tabs-body.animate').classList.remove('animate');

        if(this.isPlan){
          this.$refs.bodyplan.classList.add('active');
          this.$refs.bodyplan.classList.add('animate');
        }else{
          this.$refs.bodyfloor.classList.add('active');
          this.$refs.bodyfloor.classList.add('animate');
        }
      }
    },
    mounted() {
      this.openPopup();
    },
    data: function () {
        return {
          isPlan: true,
          swiper: null,
        }
    },
    watch: {
    },
    computed: {
    }
    
}
</script>

<template>
    <div class="popup" id="choose-flat" ref="popup">
        <div class="popup__window">
          <div class="popup__close el-close" @click="closePopup"></div>
          <div class="popup__wrapper choose-flat">
            <div class="choose-flat__tabs">
              <div class="choose-flat__top">
                <div class="choose-flat__compass"> <img src="/assets/img/icons/compass.svg" alt=""></div>
                <div class="choose-flat__scheme"><img src="/assets/img/icons/flat-scheme.svg" alt=""></div>
              </div>
              <div class="tabs-block" id="flatCardPhotos">
                <div class="tabs-body active animate" ref="bodyplan">
                    <a class="choose-flat__img" v-bind:href="popup.flat.plan" data-fancybox="flat-card"> 
                        <picture>
                            <!-- <source srcset="./img/index/flat-plan-big-1.webp" type="image/webp"> -->
                            <img v-bind:src="popup.flat.plan" alt="" loading="lazy">
                        </picture>
                    </a>
                </div>
                <div class="tabs-body" ref="bodyfloor">
                    <a class="choose-flat__img" v-bind:href="popup.floorPlan" data-fancybox="flat-card"> 
                        <picture>
                            <!-- <source srcset="./img/index/floor-plan.webp" type="image/webp"> -->
                            <img v-bind:src="popup.floorPlan" alt="" loading="lazy">
                        </picture>
                    </a>
                </div>
                <div class="tabs-btns">
                  <button class="tabs-btns__item active" @click="changeImg($event)">Планировка</button>
                  <button class="tabs-btns__item" @click="changeImg($event)">План этажа</button>
                </div>
              </div>
            </div>
            <div class="choose-flat__content">
              <h2 class="popup__title">{{ popup.flat.rooms }}-комнатная квартира {{ popup.flat.area }} м²</h2>
              <div class="choose-flat__info"> 
                <div class="choose-flat__info-item"> 
                  <div class="choose-flat__info-name">Корпус</div>
                  <div class="choose-flat__info-value">{{ popup.flat.corpus }}</div>
                </div>
                <div class="choose-flat__info-item"> 
                  <div class="choose-flat__info-name">Этаж</div>
                  <div class="choose-flat__info-value">{{ popup.flat.floor }}/{{ popup.flat.floorsNumber }}</div>
                </div>
                <div class="choose-flat__info-item"> 
                  <div class="choose-flat__info-name">Цена за 1 м²</div>
                  <div class="choose-flat__info-value">{{ Number(Math.trunc(popup.flat.price / popup.flat.area)).toLocaleString('ru-RU') }} руб/м²</div>
                </div>
              </div>
              <div class="choose-flat__labels"> 
                <div class="choose-flat__labels-item" v-for="param in popup.flat.params">{{ param }}</div>
              </div>
              <div class="choose-flat__cost">Стоимость квартиры <span>{{ Number(popup.flat.price).toLocaleString('ru-RU') }} руб.</span></div>
            </div>
            <div class="choose-flat__white-box">
              <div class="choose-flat__white-box-title">Отделка White Box*</div>
              <div class="control-wrap"> 
                <div class="control-prev choose-flat__swiper-prev" ref="prev"></div>
                <div class="control-next choose-flat__swiper-next" ref="next"></div>
              </div>
              <div class="swiper choose-flat__swiper" ref="swiper"> 
                <div class="swiper-wrapper"> 
                  <div class="swiper-slide" v-for="image in popup.flat.images"> 
                    <div class="choose-flat__swiper-img">
                        <picture>
                            <source :srcset="image" type="image/webp">
                            <img :src="image" alt="" loading="lazy">
                        </picture>
                    </div>
                  </div>
                </div>
              <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
              <div class="popup__remark">*White Box — *Белая коробка / вид предчистовой отделки</div>
            </div>
            <div class="choose-flat__btns">
                <a class="btn-s" href="" data-popup="book-apartment">Забронировать</a>
                <a class="btn-s btn-s--white" href="" data-popup="get-consultation"><span>Получить консультацию</span></a>
            </div>
          </div>
        </div>
      </div>
</template>


<!-- const chooseFlatWhiteBoxSwiper = new Swiper(chooseFlatWhiteBox, {
  speed: 1000,
  slidesPerView: 'auto',
  spaceBetween: 10,
  navigation: {
    nextEl: ".choose-flat__swiper-next",
    prevEl: ".choose-flat__swiper-prev",
  },
}) -->