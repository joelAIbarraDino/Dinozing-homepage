<script setup>
import media from '@/data/media.json'
</script>

<template>
  <section id="about-us">
    <div class="mx-auto flex w-full max-w-[1750px] flex-col gap-8 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
      <h2 class="font-thunder min-w-0 text-[16vw] leading-[0.8] font-bold tracking-wide text-verde uppercase md:text-[130px] xl:text-[min(13.9vw,250px)] xl:leading-[0.74]">
        <span class="block">
          <span class="inline-block" data-m-texto>SOMOS</span>
          <span class="ml-[0.1em] inline-block text-[0.32em] leading-[0.9] tracking-normal text-rosa xl:text-[0.4em]">EXPERTOS EN VENTAS</span>
        </span>
        <span class="relative block text-rosa">
          <picture class="contents">
            <source media="(min-width: 768px)" :srcset="media.orbe.grande">
            <img
              :src="media.orbe.chico"
              alt=""
              width="480"
              height="270"
              loading="lazy"
              decoding="async"
              class="pointer-events-none absolute top-[-0.75em] right-0 z-30 h-auto w-[1.3em] max-w-none xl:top-[-0.17em] xl:right-auto xl:left-[-0.415em] xl:w-[1.79em]"
            >
          </picture>
          <span class="hidden w-[1.1em] xl:inline-block" aria-hidden="true" />
          <span data-m-texto>INTELIGENCIA ARTIFICIAL</span>
        </span>
        <span class="block" data-m-texto>AUTOMATIZACIÓN</span>
      </h2>
      <p class="font-thunder shrink-0 pb-4 text-right text-[3rem] leading-[0.81] font-bold text-white uppercase lg:text-[6.25rem]" data-m-texto>
        / DESDE<br>MÉXICO
      </p>
    </div>
  </section>
</template>
