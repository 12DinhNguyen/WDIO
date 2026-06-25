describe('New Window - The Internet', () => {

    beforeEach(async () => {
        await browser.url('https://the-internet.herokuapp.com/windows');
    });

    it('Mở, đóng new window rồi quay lại window cũ', async () => {
        const mainWindow = await browser.getWindowHandle();

        await $('a=Click Here').click();
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length === 2);

        const newWindow = (await browser.getWindowHandles()).find((h) => h !== mainWindow) as string;
        await browser.switchToWindow(newWindow);
        await expect($('h3')).toHaveText('New Window');

        await browser.closeWindow();
        await browser.switchToWindow(mainWindow);

        expect(await browser.getWindowHandles()).toEqual([mainWindow]);
        await expect($('h3')).toHaveText('Opening a new window');
    });

    afterEach(async () => {
        const handles = await browser.getWindowHandles();
        if (handles.length > 1) {
            await browser.switchToWindow(handles[handles.length - 1]);
            await browser.closeWindow();
            await browser.switchToWindow(handles[0]);
        }
    });
});
