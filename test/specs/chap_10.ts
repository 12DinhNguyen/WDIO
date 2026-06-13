describe('ALERTS - DemoQA (Dialog API)', () => {

  before(async () => {
    await browser.url('https://demoqa.com/alerts');
    await browser.pause(1000);
  });

  it('TC01: Alert — isAlertOpen, getAlertText, acceptAlert', async () => {
    let alertDaXuatHien = false;
    let noiDungAlert = '';

    const dialogHandler = async (dialog: WebdriverIO.Dialog) => {
      alertDaXuatHien = true;
      noiDungAlert = dialog.message();
      await dialog.accept();
    };

    browser.on('dialog', dialogHandler);
    await $('#alertButton').click();

    await browser.waitUntil(
      () => alertDaXuatHien === true,
      {
        timeout: 5000,
        timeoutMsg: 'Alert không xuất hiện sau 5 giây',
      }
    );

    console.log('alertDaXuatHien =', alertDaXuatHien);
    console.log('noiDungAlert =', noiDungAlert);
    console.log('isAlertOpen =', await browser.isAlertOpen());

    expect(alertDaXuatHien).toBe(true);
    expect(noiDungAlert).toEqual('You clicked a button');
    expect(await browser.isAlertOpen()).toEqual(false);

    browser.off('dialog', dialogHandler);
  });

});
