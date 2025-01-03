/* eslint-disable @typescript-eslint/no-explicit-any */
import pdf from 'pdf-parse';
import fs from 'fs';
import Tesseract from 'tesseract.js';

export const parsePdfData = async (files: any) => {
    let content = '';

    for (const file of files) {
        if (
            file.fileType !== 'application' ||
            (file.fileExtension !== 'pdf' && file.fileExtension === 'png') ||
            file.fileExtension === 'jpg'
        ) {
            await Tesseract.recognize(file.fileUrl, 'eng').then(
                ({ data: { text } }) => {
                    // console.log('[OCR TEXT] : ', text);
                    content += text;
                },
            );

            continue;
        }

        const dataBuffer = fs.readFileSync(file.fileUrl);

        await pdf(dataBuffer).then(function (data) {
            content += data.text;
        });
    }

    return content;
};
