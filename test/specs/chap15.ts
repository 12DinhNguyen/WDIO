import path from 'path';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

describe('File Upload', () => {
    const UPLOAD_URL = 'https://the-internet.herokuapp.com/upload';
    const filePath = path.join(process.cwd(), 'test', 'fixtures', 'sample.txt');

    it('upload file & show ten file', async () => {
        await browser.url(UPLOAD_URL);

        const fileInput = $('#file-upload');
        await fileInput.setValue(filePath);
        await $('#file-submit').click();

        const uploadedFile = $('#uploaded-files');
        await expect(uploadedFile).toHaveText('sample.txt');
    });

    it('TC05: Upload qua axios', async () => {
        const fileBuffer = fs.readFileSync(filePath);

        const form = new FormData();
        form.append('file', fileBuffer, {
            filename: 'sample.txt',
            contentType: 'text/plain',
        });

        const response = await axios.post(UPLOAD_URL, form, {
            headers: form.getHeaders(),
        });

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('text/html');
        expect(response.data).toContain('File Uploaded!');
        expect(response.data).toContain('sample.txt');
    });
});
