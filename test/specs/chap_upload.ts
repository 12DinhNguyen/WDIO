import path from 'path';

describe('File Upload', () => {
    const UPLOAD_URL = 'https://the-internet.herokuapp.com/upload';

    it('upload file thành công và hiển thị tên file', async () => {
        await browser.url(UPLOAD_URL);

        const filePath = path.resolve(__dirname, '../fixtures/sample.txt');
        const fileInput = $('#file-upload');
        await fileInput.setValue(filePath);

        await $('#file-submit').click();

        const uploadedFile = await $('#uploaded-files');
        await expect(uploadedFile).toHaveText('sample.txt');
    });
});
