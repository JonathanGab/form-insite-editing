import React, {
  useRef,
  useState,
  DragEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from 'react';
import './Upload.css';
interface IUploadProps {
  files: File | null;
  setFiles: Dispatch<SetStateAction<File | null>>;
}
export default function Upload(props: IUploadProps): JSX.Element {
  const [img, setImg] = useState<object | string>();
  const [previewUrl, setPreviewUrl] = useState<string>();

  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef<HTMLInputElement>(null as any);
  const handleFile = (file: File) => {
    //you can carry out any file validations here...
    setImg(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  // handle drag events
  const handleDrag = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    let imageFile = e.dataTransfer.files[0];
    handleFile(imageFile);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.setFiles(e.dataTransfer.files[0]);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    e.preventDefault();
    if (e.target.files && file) {
      props.setFiles(file);
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewUrl(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="upload-file-container">
      <div id="form-file-upload" onDragEnter={handleDrag}>
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={false}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? 'drag-active' : ''}
        >
          <div>
            <p>Drag and drop your file here or click</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => {
              handleDrop(e);
            }}
          ></div>
        )}
      </div>
      {previewUrl && (
        <div className="upload_img_box">
          <img src={previewUrl} alt="" id="img" className="img" />
          <p>{props.files?.name}</p>
        </div>
      )}
    </div>
  );
}
