import { XMarkIcon } from '@heroicons/react/24/outline';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import Popup from 'reactjs-popup';

const DocView = ({ button, index, docs }) => {
    return (
        <Popup
            trigger={button}
            modal
            nested
            contentStyle={{
                width: '90vw',
                height: '90vh',
                borderRadius: '1rem',
                padding: '1rem',
                overflow: 'auto',
            }}
        >
            {(close) => (
                <div className="relative">
                    <button
                        className="absolute top-1 right-1 z-[99]"
                        onClick={close}
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                    <div className="p-4 rounded-2xl">
                        <DocViewer
                            documents={docs?.length ? docs : []}
                            initialActiveDocument={docs[index || 0]}
                            pluginRenderers={DocViewerRenderers}
                            config={{
                                noRenderer: {
                                    overrideComponent: ({
                                        document,
                                        fileName,
                                    }) => {
                                        const fileText =
                                            fileName ||
                                            document?.fileType ||
                                            '';
                                        console.log(document);
                                        if (fileText) {
                                            return (
                                                <div>
                                                    no renderer for {fileText}
                                                </div>
                                            );
                                        }
                                        return <div>no renderer</div>;
                                    },
                                },
                                loadingRenderer: {
                                    overrideComponent: ({
                                        document,
                                        fileName,
                                    }) => {
                                        const fileText =
                                            fileName ||
                                            document?.fileType ||
                                            '';
                                        if (fileText) {
                                            return (
                                                <div>loading ({fileText})</div>
                                            );
                                        }
                                        return <div>loading</div>;
                                    },
                                },
                                csvDelimiter: '~',
                                pdfZoom: {
                                    defaultZoom: 1.1,
                                    zoomJump: 0.2,
                                },
                            }}
                        />
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default DocView;
