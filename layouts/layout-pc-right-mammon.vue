<template>
  <div class="mammon">
    <div v-swiper:[dynamicSwiperName]="swiperOption" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="ad.text" v-for="ad in ads">
          <a class="content" :href="ad.url">
            <img :src="ad.url" alt="aliyun-ad" />
          </a>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
  import { directive } from 'vue-awesome-swiper'
  let Event = {
    Ready: 'ready',
    UpdateIndex: 'update:index',
    IndexChange: 'index-change'
  }
  export default {
    name: 'pc-aside-mammon',
    directives: {
      swiper: directive,
    },
    props: {
      index: {
        type: Number,
        default: 0
      },
      ready: {
        type: Object
      },
      dynamicSwiperName: {
        type: String,
        required: true
      }
    },
    emits: [
      Event.Ready,
      Event.UpdateIndex,
      Event.IndexChange
    ],
    data() {
      const swiperOption = {
        initialSlide: 0,
        loop: true,
        simulateTouch: false,
        direction: 'vertical',
        autoplay: {
          delay: 2960,
          disableOnInteraction: false
        },
        pagination: {
          clickable: true,
          el: '.swiper-pagination'
        },
        setWrapperSize: true,
        autoHeight: true,
        mousewheel: true,
        //observeParents: true,
        preloadImages: false,
        lazy: true
      }

      return {
        swiperOption,
        ads: [
          {
            url: 'https://uploads-ssl.webflow.com/5e96913c9bac7c0b5cb3391c/5f44a7398c0cdf460857e744_img-image.jpg',
            icon: '',
            color: 'black',
            i18n: {
              zh: 'zh',
              en: 'en',
            },
            text: 'ADSENSE',
            hot: true
          },
          {
            url: 'https://www.imgacademy.com/sites/default/files/footballfacilities1.jpg',
            icon: '',
            color: 'black',
            i18n: {
              zh: 'zh',
              en: 'en',
            },
            text: 'EXO',
            hot: true
          }
        ],
      }
    },
    mounted() {
      console.log('Swiper instances:', this.dynamicSwiperName)
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';
  @import './variables.scss';

  .mammon {
    width: 100%;
    overflow: hidden;

    .swiper {
      height: 88px;

      .swiper-wrapper {
        &[style*="300ms"] {
          .swiper-slide-active {
            @include blur-filter('vertical-small');
          }
        }

        .swiper-slide {
          .content {
            width: 100%;
            height: 100%;

            img {
              width: 100%;
              height: auto;
            }
          }
        }
      }
      .img {
        width: 100%;
        height: 100%;
      }
      .swiper-pagination {
        ::v-deep .swiper-pagination-bullet {
          &.swiper-pagination-bullet-active {
            height: $font-size-base;
            border-radius: $lg-radius;
          }
        }
      }
    }
  }
</style>
