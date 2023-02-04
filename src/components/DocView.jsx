import { XMarkIcon } from '@heroicons/react/24/outline';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import Popup from 'reactjs-popup';

const DocView = ({ button, index, docs }) => {
  const getExt = (filename) => {
    return (
      filename?.substring(filename?.lastIndexOf('.') + 1, filename?.length) ||
      filename
    );
  };

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
          <button className="absolute top-1 right-1 z-[99]" onClick={close}>
            <XMarkIcon className="w-5 h-5" />
          </button>
          <div className="p-4 rounded-2xl">
            <DocViewer
              documents={docs?.length ? docs : []}
              initialActiveDocument={docs[index || 0]}
              pluginRenderers={DocViewerRenderers}
              config={{
                noRenderer: {
                  overrideComponent: ({ document, fileName }) => {
                    const fileText = fileName || document?.fileType || '';
                    // console.log(document);
                    if (fileText) {
                      return document?.fileType?.includes('video') ? (
                        <video width="auto" height="auto" autoPlay controls>
                          <source
                            src={document?.uri}
                            type={document?.fileType}
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : document?.fileType?.includes('audio') ? (
                        <audio width="auto" height="auto" autoPlay controls>
                          <source
                            src={document?.uri}
                            type={document?.fileType}
                          />
                          Your browser does not support the audio element.
                        </audio>
                      ) : (
                        ''
                      );
                    }
                    return <div>no renderer</div>;
                  },
                },
                loadingRenderer: {
                  overrideComponent: ({ document, fileName }) => {
                    const fileText = fileName || document?.fileType || '';
                    if (fileText) {
                      return <div>loading ({fileText})</div>;
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
