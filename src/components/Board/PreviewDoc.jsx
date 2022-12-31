import React from 'react';
import {
    GrDocument,
    GrDocumentCsv,
    GrDocumentExcel,
    GrDocumentPdf,
    GrDocumentPpt,
    GrDocumentText,
    GrDocumentTxt,
    GrDocumentWord,
} from 'react-icons/gr';

// const IMAGES = 'jpg' || 'jpeg' || 'png' || 'bmp' || 'gif' || 'tiff';
// const TEXTS = 'txt' || 'html' || 'htm' || 'csv';
// const APPLICATIONS = 'doc' || 'docx' || 'pdf' || 'ppt' || 'pptx' || 'xls' || 'xlsx';

const PreviewDoc = ({ file, i, setImages }) => {
    let fileType = file?.split('.')?.pop();

    if (
        fileType === 'jpg' ||
        fileType === 'jpeg' ||
        fileType === 'png' ||
        fileType === 'bmp' ||
        fileType === 'gif' ||
        fileType === 'tiff'
    ) {
        console.log(fileType);
        return (
            <img
                src={file}
                alt={`can't preview ${fileType} file`}
                className="w-full h-full"
                onClick={() => {
                    setImages((p) => ({
                        ...p,
                        isOpen: true,
                        currentImage: i,
                    }));
                }}
            />
        );
    } else if (fileType === 'txt') {
        return <GrDocumentTxt className="w-full h-full" />;
    } else if (fileType === 'csv') {
        return <GrDocumentCsv className="w-full h-full" />;
    } else if (fileType === 'html' || fileType === 'htm') {
        return <GrDocumentText className="w-full h-full" />;
    } else if (fileType === 'pdf') {
        return <GrDocumentPdf className="w-full h-full" />;
    } else if (fileType === 'doc' || fileType === 'docx') {
        return <GrDocumentWord className="w-full h-full" />;
    } else if (fileType === 'ppt' || fileType === 'pptx') {
        return <GrDocumentPpt className="w-full h-full" />;
    } else if (fileType === 'xls' || fileType === 'xlsx') {
        return <GrDocumentExcel className="w-full h-full" />;
    } else {
        return <GrDocument className="w-full h-full" />;
    }
};

export default PreviewDoc;
