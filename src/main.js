import { createApp, createSSRApp } from 'vue'
import './style.css'
import App from './App.vue'

// En producción el HTML ya viene prerenderizado y solo se hidrata
const raiz = document.getElementById('app')
const crear = raiz.firstElementChild ? createSSRApp : createApp
crear(App).mount(raiz)
dispatchEvent(new Event('dz:app')) // avisa al preloader de index.html
