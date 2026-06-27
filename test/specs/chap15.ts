import path from 'path';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

describe('File Upload', () => {
    const UPLOAD_URL = 'https://the-internet.herokuapp.com/upload';
    let filePath: string;

    before(async () => {
    });

    beforeEach(async function () {
    });

    it('upload file & show ten file', async () => {
        await browser.url(UPLOAD_URL);
        filePath = path.join(process.cwd(), 'test', 'fixtures', 'sample.txt');

        const fileInput = $('#file-upload');
        await fileInput.setValue(filePath);
        await $('#file-submit').click();

        const uploadedFile = $('#uploaded-files');
        const textupload = await uploadedFile.getText();

        await expect(uploadedFile).toHaveText('sample.txt');
    });

    it('TC05: Upload qua axios', async () => {
        const filePath = path.join(process.cwd(), 'test', 'fixtures', 'sample.txt');
        //console.log('[TC05] filePath:', filePath);

        const fileBuffer = fs.readFileSync(filePath);
        //console.log('[TC05] Doc file thanh cong, size:', fileBuffer.length, 'bytes');

        const form = new FormData();
        form.append('file', fileBuffer, {
            filename: 'sample.txt',
            contentType: 'text/plain',
        });
        //console.log('[TC05] FormData headers:', form.getHeaders());

        const response = await axios.post(UPLOAD_URL, form, {
            headers: form.getHeaders(),
        });
        // console.log('[TC05] Status:', response.status);
        // console.log('[TC05] Content-Type:', response.headers['content-type']);
        // console.log('[TC05] Body co chua "File Uploaded!":', response.data.includes('File Uploaded!'));
        // console.log('[TC05] Body co chua "sample.txt":', response.data.includes('sample.txt'));

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('text/html');
        expect(response.data).toContain('File Uploaded!');
        expect(response.data).toContain('sample.txt');
    });
});
