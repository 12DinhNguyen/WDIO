describe('Horizontal slider', () => {
    const dragSliderToValue = async (target: number) => {
        await browser.url('https://the-internet.herokuapp.com/horizontal_slider');
        const slider = await $('input[type="range"]');
        const { width } = await slider.getSize();

        await browser.action('pointer')
            .move({ duration: 0, origin: slider, x: 0, y: 0 })
            .down({ button: 0 })
            .pause(10)
            .move({ duration: 0, origin: slider, x: Math.round((target / 5) * width - width / 2), y: 0 })
            .up({ button: 0 })
            .perform()

        await browser.pause(500);
        return $('#range').getText();
    };

    it('TC: Kéo slider tới giá trị 1', async () => {
        const value = await dragSliderToValue(1);
        expect(value).toBe('1');
    })

    it('TC: Kéo slider tới giá trị 3', async () => {
        const value = await dragSliderToValue(3);
        expect(value).toBe('3');
    })

    it('TC: Kéo slider tới giá trị 5', async () => {
        const value = await dragSliderToValue(5);
        expect(value).toBe('5');
    })
});
