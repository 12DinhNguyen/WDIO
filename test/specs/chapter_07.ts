// describe('chapter 7', () => {
//   beforeEach(async () => {
//     await browser.url('https://demoqa.com/buttons');
//   });

//   it('TC_BTN_01 — Single click thành công', async () => {
//     const clickMeButton = await $('button=Click Me');
//     await clickMeButton.waitForDisplayed();
//     await clickMeButton.click();

//     const message = await $('#dynamicClickMessage');
//     await expect(message).toBeDisplayed();
//     await expect(message).toHaveText('You have done a dynamic click');
//   });

//   it('TC_BTN_02 — Double click thành công', async () => {
//     const doubleClickButton = await $('#doubleClickBtn');
//     await expect(doubleClickButton).toBeDisplayed();
//     await doubleClickButton.doubleClick();
//     const doubleClickMessage = await $('#doubleClickMessage');

//     await expect(doubleClickMessage).toBeDisplayed();
//     await expect(doubleClickMessage).toHaveText('You have done a double click');
//   });

//   it('TC_BTN_03 — Right click thành công', async () => {
//     const rightClickButton = await $('#rightClickBtn');
//     await expect(rightClickButton).toBeDisplayed();
//     await rightClickButton.click({ button: 'right' });
//     const rightClickMessage = await $('#rightClickMessage');

//     await expect(rightClickMessage).toBeDisplayed();
//     await expect(rightClickMessage).toHaveText('You have done a right click');
//   });

//   it('TC_BTN_04 — Verify button hiển thị và enabled trước khi click', async () => {
//     const doubleClickButton = await $('#doubleClickBtn');
//     const rightClickButton = await $('#rightClickBtn');
//     const clickButton = await $('button=Click Me');

//     expect(await doubleClickButton.isDisplayed()).toBe(true);
//     expect(await rightClickButton.isDisplayed()).toBe(true);
//     expect(await clickButton.isDisplayed()).toBe(true);

//     expect(await doubleClickButton.isEnabled()).toBe(true);
//     expect(await rightClickButton.isEnabled()).toBe(true);
//     expect(await clickButton.isEnabled()).toBe(true);
//   });
//   });

//   describe('TC_BTN_05 - Verify chỉ đúng message tương ứng xuất hiện sau mỗi loại click', () => {
//   const pageUrl = 'https://demoqa.com/buttons';

//   it('TC_BTN_05 - Verify chỉ đúng message tương ứng xuất hiện sau mỗi loại click', async () => {
//     // Single click
//     await browser.url(pageUrl);

//     const singleClickButton = await $('button=Click Me');
//     await expect(singleClickButton).toBeDisplayed();
//     await expect(singleClickButton).toBeEnabled();

//     await singleClickButton.click();
//     await expectOnlyDynamicClickMessageDisplayed();

//     // Double click
//     await browser.refresh();

//     const doubleClickButton = await $('#doubleClickBtn');
//     await doubleClickButton.waitForDisplayed();
//     await doubleClickButton.waitForEnabled();
//     await doubleClickButton.scrollIntoView();
//     await doubleClickButton.waitForClickable({ timeout: 5000 });

//     await doubleClickButton.doubleClick();
//     await $('#doubleClickMessage').waitForDisplayed({ timeout: 5000 });
//     await expectOnlyDoubleClickMessageDisplayed();

//     // Right click
//     await browser.refresh();

//     const rightClickButton = await $('#rightClickBtn');
//     await expect(rightClickButton).toBeDisplayed();
//     await expect(rightClickButton).toBeEnabled();

//     await rightClickButton.click({ button: 'right' });
//     await expectOnlyRightClickMessageDisplayed();
//   });
//    async function expectOnlyDynamicClickMessageDisplayed() {
//     await expect($('#dynamicClickMessage')).toBeDisplayed();
//     await expect($('#dynamicClickMessage')).toHaveText('You have done a dynamic click');

//     await expect($('#doubleClickMessage')).not.toBeDisplayed();
//     await expect($('#rightClickMessage')).not.toBeDisplayed();
//   }

//   async function expectOnlyDoubleClickMessageDisplayed() {
//     const msg = await $('#doubleClickMessage');
//     await msg.waitForDisplayed({ timeout: 5000 });
//     await expect(msg).toHaveText('You have done a double click');

//     await expect($('#dynamicClickMessage')).not.toBeDisplayed();
//     await expect($('#rightClickMessage')).not.toBeDisplayed();
//   }

//   async function expectOnlyRightClickMessageDisplayed() {
//     await expect($('#rightClickMessage')).toBeDisplayed();
//     await expect($('#rightClickMessage')).toHaveText('You have done a right click');

//     await expect($('#dynamicClickMessage')).not.toBeDisplayed();
//     await expect($('#doubleClickMessage')).not.toBeDisplayed();
//   }
// });

// describe('TC_BTN_06 - Verify getText() của button trả về đúng label', () => {
//   it('Verify button labels are correct', async () => {
//     // Mở trình duyệt, điều hướng đến trang
//     await browser.url('https://demoqa.com/buttons');

//     // Lấy text của #doubleClickBtn bằng getText()
//     const doubleClickButton = await $('#doubleClickBtn');
//     const doubleClickButtonText = await doubleClickButton.getText();

//     // Verify text bằng Double Click Me
//     expect(doubleClickButtonText).toBe('Double Click Me');

//     // Lấy text của #rightClickBtn bằng getText()
//     const rightClickButton = await $('#rightClickBtn');
//     const rightClickButtonText = await rightClickButton.getText();

//     // Verify text bằng Right Click Me
//     expect(rightClickButtonText).toBe('Right Click Me');
//   });
// });

// describe('TC_BTN_07 - Verify scrollIntoView trước khi click button nằm cuối trang', () => {
//   it('Verify user can scroll to single click button and click successfully', async () => {
//     // Mở trình duyệt, điều hướng đến trang
//     await browser.url('https://demoqa.com/buttons');

//     // Find single-click button by visible text (more stable than #clickBtn)
//     const clickButton = await $('button=Click Me');

//     // Ensure it's visible, enabled and clickable
//     await clickButton.waitForDisplayed();
//     await clickButton.waitForEnabled();
//     await clickButton.scrollIntoView();
//     await clickButton.waitForClickable({ timeout: 5000 });

//     // Click into button and verify message
//     await clickButton.click();
//     const dynamicClickMessage = await $('#dynamicClickMessage');
//     await dynamicClickMessage.waitForDisplayed({ timeout: 5000 });
//     await expect(dynamicClickMessage).toHaveText('You have done a dynamic click');
//   });
// });

describe('TC_RAD_01/02/03 - Radio Buttons', () => {
  beforeEach(async () => {
    await browser.url('https://practice.expandtesting.com/radio-buttons');
  });

  it('TC_RAD_01 - Chọn radio button value="blue" và verify isSelected() = true', async () => {
    const blueRadio = await $('input[name="color"][value="blue"]');
    await blueRadio.click();

    const isSelected = await blueRadio.isSelected();
    await expect(isSelected).toBe(true);
  });

  it('TC_RAD_02 - Verify default selection trong nhóm radio color', async () => {
    const colorRadios = await $$('input[name="color"]');

    for (const radio of colorRadios) {
      const value = await radio.getAttribute('value');
      const isSelected = await radio.isSelected();

      if (value === 'blue') {
        await expect(isSelected).toBe(true);
      } else {
        await expect(isSelected).toBe(false);
      }
    }
  });

  it('TC_RAD_03 - Verify selecting a new radio deselects the previous one', async () => {
    const blueRadio = await $('input[name="color"][value="blue"]');
    const redRadio = await $('input[name="color"][value="red"]');

    await blueRadio.click();
    await expect(blueRadio).toBeSelected();

    await redRadio.click();
    await expect(redRadio).toBeSelected();
    await expect(blueRadio).not.toBeSelected();
  });
});