describe('The Internet home page', () => {
    //TC01 — Kiểm tra tiêu đề trang chủ
    it('should show the correct browser title', async () => {
        await browser.url('https://the-internet.herokuapp.com');
        const title = await browser.getTitle();
        console.log('Page title is:', title);

        expect(title).toBe('The Internet');
    });

    //TC02 — Đăng nhập thành công
    it('should show a success message', async () => {
        await browser.url('https://the-internet.herokuapp.com/login');

        await $('#username').setValue('tomsmith');
        await $('#password').setValue('SuperSecretPassword!');
        await $('button[type="submit"]').click();

        await browser.pause(1000);

        const message = await $('#flash').getText();

        expect(message).toContain('You logged into a secure area!');
    });

    //TC03 — Đăng nhập thất bại
    it('should show an error message', async () => {
        await browser.url('https://the-internet.herokuapp.com/login');

        await $('#username').setValue('wronguser');
        await $('#password').setValue('wrongpassword');
        await $('button[type="submit"]').click();

        await browser.pause(1000);
        const message = await $('#flash').getText();

        expect(message).toContain('Your username is invalid!');
    });

    //TC04 — Đếm và click Checkbox
    it('should count checkboxes', async () => {
        await browser.url('https://the-internet.herokuapp.com/checkboxes');

        const checkboxes = await $$('input[type="checkbox"]');
        expect(checkboxes.length).toBe(2);
        const firstCheckbox = await $('form input[type="checkbox"]:first-child');
        await firstCheckbox.click();

        const checkboxType = await checkboxes[0].getAttribute('type');
        expect(checkboxType).toBe('checkbox');
    });

    it('should select Option 2 and verify its text', async () => {
        await browser.url('https://the-internet.herokuapp.com/dropdown');
        const optionTwo = await $('#dropdown option[value="2"]');
        await optionTwo.click();
        await browser.pause(1000);

        const optionText = await optionTwo.getText();
        expect(optionText).toBe('Option 2');
    });


    it('add three delete buttons, remove one, and verify', async () => {
        await browser.url('https://the-internet.herokuapp.com/add_remove_elements/');

        const addButton = await $('button=Add Element');
        await addButton.click();
        await addButton.click();
        await addButton.click();

        let deleteButtons = await $$('button=Delete');
        expect(deleteButtons.length).toBe(3);
        await deleteButtons[0].click();
        deleteButtons = await $$('button=Delete');
        expect(deleteButtons.length).toBe(2);
    });


    it.only('replace the value with setValue and append with addValue', async () => {
        await browser.url('https://the-internet.herokuapp.com/inputs');
        const numberInput = await $('input[type="number"]');

        await numberInput.setValue('123');
        await numberInput.addValue('456');

        const inputValue = await numberInput.getAttribute('value');
        expect(inputValue).toBe('123456');
    });
});
