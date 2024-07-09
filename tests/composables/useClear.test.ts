import { describe, it, expect } from 'vitest'
import { useClear } from '~/composables/useClear';
import { useTicket } from '~/stores/useTicket';
import { mount } from '@vue/test-utils';

describe('useClear', () => {
    it('increments the count', () => {
        const { clear } = useClear();
        const { 
            cityTicketList, 
            distTicketList,
            vliTicketList 
            } = useTicket();
        clear();
        expect(cityTicketList.length).toBe(0);
        expect(distTicketList.length).toBe(0);
        expect(vliTicketList.length).toBe(0);
    })
})