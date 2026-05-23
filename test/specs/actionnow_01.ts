describe('Feedback page - textarea setValue', () => {
    //   it('Click ddl and select Group 2, option 1', async () => {
    //   await browser.url('https://demoqa.com/select-menu');
    //   await browser.maximizeWindow();


    //   // 1. Lấy locator của ddl
    //   const eddl = $('.css-13cymwt-control');

    //   // 2. Click vào ddl
    //   await eddl.click();
    //   await eddl.waitForDisplayed();
    //   // browser.pause(3000); // Tạm dừng để options hiển thị

    //   const eoptionGroup2Option1 = await $$('#withOptGroup div[role="option"]');
    //   // console.log('Total options:', eoptionGroup2Option1.length);

    //   for (const option of eoptionGroup2Option1) {
    //     const text = await option.getText();
    //     console.log('Option text:', text);
    //     if (text === 'Group 2, option 1') {
    //       await option.click();
    //       break;
    //     } 
    //   }



    //   // // 3. Chờ cho options hiển thị
    //   // const optionGroup2Option1 = $('//div[text()="Group 2, option 1"]');
    //   // await optionGroup2Option1.waitForDisplayed();

    //   // // 4. Click vào Group 2, option 1
    //   // await optionGroup2Option1.click();

    //   // // Optional: kiểm tra đã chọn đúng value
    //   // await expect(ddl).toHaveText(expect.stringContaining('Group 2, option 1'));
    // });

    // it('TC - Select Group 2, option 1 with JS click', async () => {
    //   await browser.url('https://demoqa.com/select-menu');
    //   await browser.maximizeWindow();

    //   const ddl = $('.css-13cymwt-control');

    //   await ddl.waitForDisplayed({ timeout: 10000 });
    //   // await ddl.scrollIntoView();

    //   // Click ddl bằng JS
    //   await ddl.click();

    //   const option = $('#react-select-2-option-1-0');

    //   await option.waitForDisplayed({
    //     timeout: 10000,
    //     timeoutMsg: 'Option Group 2, option 1 chưa hiển thị'
    //   });

    //   // await expect($('#withOptGroup')).toHaveText(
    //   //   expect.stringContaining('Group 2, option 1')
    //   // );
    // });
    it('Lay locator của ddl', async () => {

        await browser.maximizeWindow();

        await browser.url('https://demoqa.com/select-menu');

        const eDropdownList = await $('.css-13cymwt-control');

        await eDropdownList.click();

        await eDropdownList.waitForDisplayed();

        const eSelectOptions = await $$('#withOptGroup div[role="option"]');

        // const options = await eSelectOption.length;

        for (const opt of eSelectOptions) {

            const text = await opt.getText();

            if (text === "Group 2, option 1") {

                await opt.click();

                break;
            }
        }
        const eSelectedOption = await $('.css-1dimb5e-singleValue');
        // eSelectedOption.getText();
        console.log('Selected option:', await eSelectedOption.getText());

    });
});