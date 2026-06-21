import { expect } from '@wdio/globals';

// describe('HORIZONTAL SLIDER - The Internet', () => {
//   const moveSliderTo = async (value: string) => {
//     const slider = $('input[type="range"]');
//     await slider.click();

//     await browser.execute((newValue: string) => {
//       const range = document.querySelector('input[type="range"]') as HTMLInputElement;
//       range.value = newValue;
//       range.dispatchEvent(new Event('input', { bubbles: true }));
//       range.dispatchEvent(new Event('change', { bubbles: true }));
//     }, value);
//   };

//   beforeEach(async () => {
//     await browser.url('https://the-internet.herokuapp.com/horizontal_slider');
//     await $('input[type="range"]').waitForDisplayed({ timeout: 120000 });
//     await moveSliderTo('0');
//     await expect($('#range')).toHaveText('0');
//   });

//   it('TC01: Click vào slider và di chuyển đến 2', async () => {
//     await moveSliderTo('2');
//     await browser.waitUntil(async () => (await $('#range').getText()) === '2', {
//       timeout: 10000,
//       interval: 500,
//     });
//     await expect($('#range')).toHaveText('2');
//   });

//   it('TC02: Click vào slider và di chuyển đến 3', async () => {
//     await moveSliderTo('3');
//     await browser.waitUntil(async () => (await $('#range').getText()) === '3', {
//       timeout: 10000,
//       interval: 500,
//     });
//     await expect($('#range')).toHaveText('3');
//   });

//   it('TC03: Click vào slider và di chuyển đến 5', async () => {
//     await moveSliderTo('5');
//     await browser.waitUntil(async () => (await $('#range').getText()) === '5', {
//       timeout: 10000,
//       interval: 500,
//     });
//     await expect($('#range')).toHaveText('5');
//   });
// it('TC04: Slider không vượt giới hạn [0, 5] — chặn đúng ở cả 2 biên', async () => {
//   const slider = $('input[type="range"]');
//   await slider.click(); // focus slider

//   // Biên trên: tới max rồi cố bấm thêm -> phải DỪNG ở 5
//   await browser.keys(['End']);
//   for (let i = 0; i < 5; i++) await browser.keys(['ArrowRight']);
//   await expect($('#range')).toHaveText('5');

//   // Biên dưới: về min rồi cố bấm thêm -> phải DỪNG ở 0
//   await browser.keys(['Home']);
//   for (let i = 0; i < 5; i++) await browser.keys(['ArrowLeft']);
//   await expect($('#range')).toHaveText('0');
// });

// });


describe('TC04 - Horizontal Slider', () => {

  it('Di chuyển slider tới giá trị 3', async () => {
    await browser.maximizeWindow();
    await browser.url('https://the-internet.herokuapp.com/horizontal_slider', { wait: 'interactive' });

    const number = await horizontal_slider('3'); // di chuyển slider tới 3

    expect(number).toEqual('3', '5', '1');
  });
});

// Hàm dùng lại: di chuyển slider tới target, trả về giá trị cuối
async function horizontal_slider(target) {
  const eSlider = await $('input[type="range"]');
  await eSlider.click();        // focus slider
  await browser.keys('Home');   // ⭐ luôn bắt đầu từ 0 -> ổn định

  let number = await $('#range').getText();
  for (let i = 0; i < 12 && number !== target; i++) {
    await browser.keys('ArrowRight'); // +0.5 mỗi bước
    number = await $('#range').getText();
  }
  return number;
}
