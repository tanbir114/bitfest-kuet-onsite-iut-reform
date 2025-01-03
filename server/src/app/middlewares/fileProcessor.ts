/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { TFile } from '../modules/notes/notes.interface';
import { parsePdfData } from '../utils/parsePdf';
// import { TNote } from '../modules/notes/notes.interface';

const processFileData = (file: any): TFile => {
    const fileType = file.mimetype.split('/')[0] as 'image' | 'application';
    const fileExtension = file.mimetype.split('/')[1] as 'jpg' | 'png' | 'pdf';
    return {
        fileName: file.originalname,
        fileType,
        fileExtension,
        fileUrl: file.path,
    };
};
export const fileProcessor = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const files: TFile[] = [];

    if (Array.isArray(req.files)) {
        // If req.files is an array
        req.files.forEach((file) => {
            files.push(processFileData(file));
        });
    } else {
        // If req.files is an object
        for (const fieldName in req.files) {
            const fileArray = req.files[fieldName]; // Typed as File[]
            fileArray.forEach((file) => {
                files.push(processFileData(file));
            });
        }
    }

    const parsedBody = JSON.parse(req.body.note);

    const content: string = await parsePdfData(files);

    req.body = {
        title: parsedBody.title,
        content: content.replace(/\n+/g, ' '),
        files,
        owner: req.params.userId,
    };

    next();
};
