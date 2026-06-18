describe('horizontal_slider', () => {
    const SLIDER_URL = 'https://the-internet.herokuapp.com/horizontal_slider';
    const eSlider = () => $('input[type="range"]');

    it('di chuyển slider tới các giá trị 1, 3, 5', async () => {
        await browser.url(SLIDER_URL);
        expect(await setSliderTo(5)).toBe('5');

        await browser.url(SLIDER_URL);
        expect(await setSliderTo(1)).toBe('1');

        await browser.url(SLIDER_URL);
        expect(await setSliderTo(3)).toBe('3');
    });

    async function setSliderTo(targetValue: number) {
        await eSlider().click();
        await browser.keys('Home');

        const steps = targetValue / 0.5;
        for (let i = 0; i < steps; i++) {
            await browser.keys('ArrowRight');
        }
        return await eSlider().getValue();

    }
});