describe('Handle Alerts — demoqa.com/alerts', function () {

  before(async () => { await browser.maximizeWindow(); });

  beforeEach(async () => {
    await browser.url('https://demoqa.com/alerts');
    await browser.pause(1000);
  });

  // ── TC01: Alert ────────────────────────────────────────
  it('TC01: Alert — isAlertOpen, getAlertText, acceptAlert', async function () {  // Thử lại nếu thất bại,
    console.log(this.test.title);
    await $('#alertButton').click();
    const isAlertOpen = await browser.isAlertOpen();
    expect(isAlertOpen).toEqual(false);

    const text = await browser.getAlertText();
    expect(text).toEqual('You clicked a button');

    await browser.acceptAlert();
    expect(await browser.isAlertOpen()).toEqual(false);
  });

  // ── TC02: Timer Alert ──────────────────────────────────
  it('TC02: Timer Alert — waitUntil isAlertOpen', async () => {
    await $('#timerAlertButton').click();

    await browser.waitUntil(
      async () => await browser.isAlertOpen(),
      { timeout: 8000, timeoutMsg: 'Alert không mở sau 8s', interval: 500 }
    );

    const text = await browser.getAlertText();
    expect(text).toEqual('This alert appeared after 5 seconds');
    await browser.acceptAlert();
  });

  // ── TC03: Confirm — Accept ─────────────────────────────
  it('TC03: Confirm — acceptAlert → result = Ok', async () => {
    await $('#confirmButton').click();
    expect(await browser.getAlertText()).toEqual('Do you confirm action?');
    await browser.acceptAlert();
    expect(await $('#confirmResult').getText()).toEqual('You selected Ok');
  });

  // ── TC04: Confirm — Dismiss ────────────────────────────
  it('TC04: Confirm — dismissAlert → result = Cancel', async () => {
    await $('#confirmButton').click();
    await browser.dismissAlert();
    expect(await $('#confirmResult').getText()).toEqual('You selected Cancel');
  });

  // ── TC05: Prompt — sendAlertText + Accept ──────────────
  it('TC05: Prompt — sendAlertText rồi acceptAlert', async () => {
    await $('#promtButton').click();  // typo của demoqa
    expect(await browser.getAlertText()).toEqual('Please enter your name');
    await browser.sendAlertText('Automation Tester');
    await browser.acceptAlert();
    expect(await $('#promptResult').getText())
      .toEqual('You entered Automation Tester');
  });

  // ── TC06: Prompt — Dismiss ─────────────────────────────
  it('TC06: Prompt — dismissAlert không nhập text', async () => {
    await $('#promtButton').click();
    await browser.dismissAlert();
    expect(await $('#promptResult').isDisplayed()).toEqual(false);
  });

  // ── TC07: isAlertOpen khi không có dialog ──────────────
  it('TC07: isAlertOpen = false khi không có dialog', async () => {
    // Không trigger gì — kiểm tra không có dialog
    const isOpen = await browser.isAlertOpen();
    expect(isOpen).toEqual(false);
  });

  // ── TC08: Timer Alert — bắt bằng browser.on('dialog') (BiDi) ──
  it('TC08: Timer Alert — xử lý qua browser.on("dialog")', async () => {
    let msg = null;
    let type = null;
    let defaultValue = null;

    // Handler CHỈ thu thập dữ liệu + đóng dialog, KHÔNG assert ở đây
    const handler = async (dialog) => {
      msg = dialog.message();
      type = dialog.type();
      defaultValue = dialog.defaultValue();
      await dialog.accept();
    };
    browser.on('dialog', handler);

    try {
      await $('#timerAlertButton').click();

      await browser.waitUntil(
        () => msg !== null,
        { timeout: 8000, timeoutMsg: 'Dialog không xuất hiện sau 5s', interval: 500 }
      );

      expect(type).toEqual('alert');
      expect(msg).toEqual('This alert appeared after 5 seconds');
    } finally {
      browser.off('dialog', handler);
    }
  });

  it('TC010 — Dialog', async () => {
    let msg;
    let type;

    const handler = async (dialog) => {
      msg = dialog.message();
      type = dialog.type();
      await dialog.accept();
    };
    browser.on('dialog', handler);

    await $('#alertButton').click();

    await browser.waitUntil(
      () => msg !== undefined,
      { timeout: 5000, timeoutMsg: 'Dialog không xuất hiện', interval: 300 }
    );

    console.log('TYPE is:', type);

    expect(type).toEqual('alert');
    expect(msg).toEqual('You clicked a button');
    browser.off('dialog', handler);
  });

});
