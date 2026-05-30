describe('DemoQA Alerts', () => {
  it('Click Cancel trên confirm alert và verify text result', async () => {
    await browser.url('https://demoqa.com/alerts');

    const confirmButton = await $('#confirmButton');
    const confirmResult = await $('#confirmResult');

    await confirmButton.click();

    const alertText = await browser.getAlertText();
    await expect(alertText).toBe('Do you confirm action?');
    await browser.pause(2000);
    console.log('Alert text: ' + alertText);
    await browser.dismissAlert();
    await expect(confirmResult).toHaveText('You selected Cancel');
    
  });
});


describe.only('DemoQA Alerts - Prompt', () => {
  it('Nhập text vào prompt alert, click OK và verify result', async () => {
    await browser.url('https://demoqa.com/alerts');

    const promptButton = await $('#promtButton');
    const promptResult = await $('#promptResult');

    await promptButton.scrollIntoView();
    await promptButton.click();

    await expect(await browser.isAlertOpen()).toBe(true);
    await browser.sendAlertText('abcv');
    await browser.acceptAlert();

    await expect(promptResult).toHaveText('You entered abcv');
  });

  it('Cancel prompt alert và verify không hiển thị text You entered', async () => {
    await browser.url('https://demoqa.com/alerts');

    const promptButton = await $('#promtButton');
    const promptResult = await $('#promptResult');

    await promptButton.scrollIntoView();
    await promptButton.click();

    await expect(await browser.isAlertOpen()).toBe(true);
    await browser.dismissAlert();

    await expect(await promptResult.isExisting()).toBe(false);
  });
});