import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import ch from '../locales/ch.json';

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'en',
        messages: {
            en, 
            ch,
        }
    })

    vueApp.use(i18n)
})