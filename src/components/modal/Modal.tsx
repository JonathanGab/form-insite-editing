import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from 'react';
import axios from 'axios';
import './Modal.css';
import Upload from '../upload/Upload';
import TextField from '@mui/material/TextField';

interface IModalProps {
  open: boolean;
  onClick: () => void;
  uploadId: number | string;
  setUploadId: Dispatch<SetStateAction<number | string>>;
  mediaId: number | string;
  setMediaId: Dispatch<SetStateAction<number | string>>;
}
interface IMap {
  id: number | string;
  guid: {
    rendered: string;
  };
}
export default function Modal(props: IModalProps): JSX.Element {
  const [altText, setAltText] = useState<string>('');
  const [legend, setLegend] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [medias, setMedias] = useState([]);
  const [files, setFiles] = useState<File | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost/module/wp-json/wp/v2/media?per_page=100')
      .then((res) => setMedias(res.data))
      .catch((err) => console.error(err));
  }, []);

  const postImage = async (e: MouseEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', files as File);
    formData.append('alt_text', altText);
    formData.append('description', description);
    formData.append('caption', legend);
    try {
      const document = await axios.post(
        'http://localhost/module/wp-json/wp/v2/media',
        formData,
        {
          headers: {
            'content-disposition': `attachment; filename="image.png"`,
            'Content-Type': 'image/png',
            Accept: '*/*',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      props.setUploadId(document.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={props.open ? 'mod_open_container' : 'mod_close_container'}>
      <div className="modal">
        <div className="mod_padding">
          <div className="close_btn">
            <div className="mod_close_btn" onClick={props.onClick}>
              x
            </div>
          </div>
          <div className="mod_header">
            <div>
              <h1>Sélectionnez un média</h1>
            </div>
            <div className="mod_filter_search">
              <button>Filtre</button> <input type="text" />
            </div>
          </div>
          <div className="mod_wrapper">
            <div className="mod_direction">
              <div className="mod_grid">
                {medias.map((i: IMap) => (
                  <div className="mod_box" key={i.id}>
                    <img
                      src={i.guid.rendered}
                      alt=""
                      className="mod_img"
                      onClick={() => props.setMediaId(i.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mod_btn_send">
              <button onClick={props.onClick} className="btn_send">
                Valider
              </button>
            </div>
            <div className="divider">
              <div className="divider_text">OU</div>
            </div>
            <div className="mod_upload_container">
              <h1>Uploader un média</h1>
              <div className="mod_upload_block">
                <div className="mod_upload_left">
                  <Upload files={files} setFiles={setFiles} />
                </div>
                <div className="mod_upload_right">
                  <div className="mod_update_input">
                    <TextField
                      id="outlined-name"
                      label="alt"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                    />
                  </div>
                  <div className="mod_update_input">
                    <TextField
                      id="outlined-name"
                      label="legend"
                      onChange={(e) => setLegend(e.target.value)}
                      value={legend}
                    />
                  </div>
                  <div className="mod_update_input">
                    <TextField
                      id="outlined-name"
                      label="description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                </div>
              </div>
              <div className="mod_btn_send">
                <button
                  className="btn_send"
                  onClick={(e) => {
                    postImage(e);
                    props.onClick();
                  }}
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
