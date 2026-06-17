describe('horizontal_slider', () => {
    const SLIDER_URL = 'https://the-internet.herokuapp.com/horizontal_slider';
    const eSlider = () => $('input[type="range"]');

    it('di chuyển slider tới giá trị 1', async () => {
        await browser.url(SLIDER_URL);
        const value = await setSliderTo(1);
        expect(value).toBe('1');
    });

    it('di chuyển slider tới giá trị 3', async () => {
        await browser.url(SLIDER_URL);
        const value = await setSliderTo(3);
        expect(value).toBe('3');
    });

    it('di chuyển slider tới giá trị 5', async () => {
        await browser.url(SLIDER_URL);
        const value = await setSliderTo(5);
        expect(value).toBe('5');
    });

    async function setSliderTo(targetValue: number) {
        await eSlider().click();
        await browser.keys('Home');

        const steps = targetValue / 0.5;
        for (let i = 0; i < steps; i++) {
            await browser.keys('ArrowRight');
        }
        return eSlider().getValue();
    }
});