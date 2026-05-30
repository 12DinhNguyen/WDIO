describe('NATIVE CHECKBOX', () => {
  beforeEach(async () => {
    await browser.url('https://practice.expandtesting.com/checkboxes');
  });

  it('TC01 - Native: Check một checkbox', async () => {
    const checkbox1 = await $('#checkbox1');
    expect(await checkbox1.isSelected()).toBe(false);
    await checkbox1.click();

    const isSelected = await checkbox1.isSelected();
    expect(isSelected).toBe(true);
  });

  it('TC02 - Native: Uncheck checkbox đang checked', async () => {
    const checkbox2 = await $('#checkbox2');
    expect(await checkbox2.isSelected()).toBe(true);

    await checkbox2.click();

    const isSelectedAfterClick = await checkbox2.isSelected();
    expect(isSelectedAfterClick).toBe(false);
  });

  it('TC03 - Native: Checkbox hoạt động độc lập nhau', async () => {
    const checkbox1 = await $('#checkbox1');
    const checkbox2 = await $('#checkbox2');

    await checkbox1.click();
    await checkbox2.click();
    expect(await checkbox1.isSelected()).toBe(true);
    expect(await checkbox2.isSelected()).toBe(false);

    await checkbox2.click();
    expect(await checkbox1.isSelected()).toBe(true);
    expect(await checkbox2.isSelected()).toBe(true);
  });

  it('TC04 - Native: Đếm tổng số checkbox trên trang', async () => {
    const checkboxes = await $$('#checkboxes > input');
    expect(checkboxes.length).toBeGreaterThan(0);
  });
});

describe('CUSTOM CHECKBOX (Tree)', () => {
  beforeEach(async () => {
    await browser.url('https://demoqa.com/checkbox');
  });

  it('TC05 - Custom: Click vào span visible để check node', async () => {
    const treeCheckbox = await $('span[role="checkbox"]');
    await treeCheckbox.waitForDisplayed({ timeout: 10000 });
    await treeCheckbox.click();

    const treeTitle = await $('.rc-tree-title').getText();
    console.log('Tree node title:', treeTitle);
    expect(treeTitle).not.toBe('');
  });
});

describe('ALERTS', () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('https://demoqa.com/alerts');
    await $('#alertButton').waitForDisplayed({ timeout: 10000 });
  });

  it('TC01 - Alert: Verify isAlertOpen, đọc text, acceptAlert', async () => {
    await $('#alertButton').click();

    const open = await browser.isAlertOpen();
    expect(open).toBe(true);

    const text = await browser.getAlertText();
    expect(text).toBe('You clicked a button');

    await browser.acceptAlert();

    const openAfter = await browser.isAlertOpen();
    expect(openAfter).toBe(false);
  });

  it('TC02 - Alert: Timer alert xuất hiện sau ~5s', async () => {
    const btn = await $('#timerAlertButton');
    await btn.waitForDisplayed({ timeout: 5000 });
    await btn.click();

    // Wait up to 8s for the alert to appear (the page triggers after ~5s)
    await browser.waitUntil(async () => await browser.isAlertOpen(), {
      timeout: 8000,
      interval: 200,
      timeoutMsg: 'Expected alert to open within 8s after clicking timer button',
    });

    const text = await browser.getAlertText();
    expect(text).toBe('This alert appeared after 5 seconds');

    await browser.acceptAlert();

    expect(await browser.isAlertOpen()).toBe(false);
  });

  it('TC03 - Confirm: Click OK -> verify result', async () => {
    const btn = await $('#confirmButton');
    await btn.waitForDisplayed({ timeout: 5000 });
    await btn.click();

    // Confirm should open immediately; read its text then accept
    await browser.waitUntil(async () => await browser.isAlertOpen(), {
      timeout: 2000,
      interval: 100,
      timeoutMsg: 'Expected confirm to open shortly after clicking',
    });

    const confirmText = await browser.getAlertText();
    expect(confirmText).toBe('Do you confirm action?');

    await browser.acceptAlert();

    const result = await $('#confirmResult').getText();
    expect(result).toBe('You selected Ok');
  });
});