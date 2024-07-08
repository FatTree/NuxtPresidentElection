import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NavBar from "~/components/NavBar.vue";
describe('Test App.vue', () => {
    it('renders the app component', () => {
        const wrapper = mount(NavBar);
        expect(wrapper.findComponent(NavBar).exists()).toBe(true);
    });
    // it('shows the title', () => {
    //     const wrapper = mount(NavBar);
    //     expect(wrapper.text()).toContain('Welcome to Nuxt.js');
    // });
})