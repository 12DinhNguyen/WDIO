// // describe('Feedback form - setValue behavior', () => {

// //   it('TC01 - setValue() ghi đè nội dung cũ', async () => {
// //     await browser.url('https://practice.expandtesting.com/feedback');

// //     const tabContact = await $('a[href="#panel1"]');
// //     await tabContact.waitForClickable({ timeout: 10000 });
// //     await tabContact.click();

// //     await browser.execute(() => {
// //       const tabContact = document.querySelector('a[href="#panel1"]');
// //       if (tabContact) {
// //         tabContact.click();
// //       }

// //       const input = document.querySelector('#yourName');
// //       const formPanel = document.querySelector('div.content[data-slug="panel1"]');
// //       const nodes = [formPanel, input].filter(Boolean);

// //       nodes.forEach((node) => {
// //         let current = node;
// //         while (current && current.nodeType === 1) {
// //           const element = current;
// //           element.style.display = 'block';
// //           element.style.visibility = 'visible';
// //           element.style.opacity = '1';
// //           element.style.transform = 'none';
// //           element.style.position = 'relative';
// //           element.style.top = '0';
// //           element.style.left = '0';
// //           current = current.parentElement;
// //         }
// //       });
// //     });

// //     // Input field
// //     const eNameInput = await $('#yourName');
// //     await eNameInput.waitForExist({ timeout: 10000 });

// //     await browser.waitUntil(
// //       async () => await eNameInput.isDisplayed(),
// //       {
// //         timeout: 10000,
// //         timeoutMsg: 'Name input still hidden after opening feedback panel',
// //       }
// //     );
// //     await eNameInput.scrollIntoView();
// //     await eNameInput.click();
// //     await eNameInput.setValue('Old value');
// //     await eNameInput.setValue('New value');

// //     await expect(eNameInput).toHaveValue('New value');

// //     // Textarea field
// //     const eMessageTextarea = await $('textarea');
// //     await eMessageTextarea.waitForExist({ timeout: 10000 });
// //     await eMessageTextarea.waitForDisplayed({ timeout: 10000 });
// //     await eMessageTextarea.scrollIntoView();
// //     await eMessageTextarea.click();
// //     await eMessageTextarea.setValue('Old message');
// //     await eMessageTextarea.setValue('New message');

// //     await expect(eMessageTextarea).toHaveValue('New message');
// //   });
// // });


// describe('Feedback page - textarea setValue', () => {
//   it('TC01 - setValue() should overwrite old value in textarea', async () => {
//     await browser.url('https://practice.expandtesting.com/feedback');

//     const eMessageTextarea = await $('textarea');
//     await eMessageTextarea.waitForDisplayed();

//     await eMessageTextarea.setValue('Nội dung cũ');
//     await expect(eMessageTextarea).toHaveValue('Nội dung cũ');

//     await eMessageTextarea.setValue('Nội dung mới');
//     await expect(eMessageTextarea).toHaveValue('Nội dung mới');
//   });

//   it('TC01 - setValue() should overwrite old value in input', async () => {
//     await browser.url('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

//     const usernameInput = await $('input[name="username"]');
//     await usernameInput.waitForDisplayed();

//     await usernameInput.setValue('OldUsername');
//     await expect(usernameInput).toHaveValue('OldUsername');

//     await browser.execute((input) => {
//       input.focus();
//       input.value = '';
//       input.dispatchEvent(new Event('input', { bubbles: true }));
//       input.dispatchEvent(new Event('change', { bubbles: true }));
//     }, usernameInput);
//     await usernameInput.setValue('Admin');
//     await expect(usernameInput).toHaveValue('Admin');
//   });
// });