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
  //. boolean for open modal
  open: boolean;
  //. route to media url
  //. ex: http://localhost/drupal/jsonapi/file/file
  route_to_media: string;
  //. ex: http://localhost/drupal/jsonapi/node/article/ + field_image
  api_url: string;
  //. function for open modal and update file
  onClick: () => void;
  //. for update url on click image
  chemin: string;
  //. function for update the state
  setUploadId: Dispatch<SetStateAction<number | string>>;
  //. state for get id the file already upload
  mediaId: number | string;
  //. function for update the state
  setMediaId: Dispatch<SetStateAction<number | string>>;
  //. state for add alt text on upload
  altText: string;
  //. function for update the state
  setAltText: Dispatch<SetStateAction<string>>;
  //. state for add title text on upload
  title: string;
  //. function for update the state
  setTitle: Dispatch<SetStateAction<string>>;
}
interface IMap {
  id: number | string;
  attributes: {
    uri: {
      url: string;
    };
  };
}
export default function ModalDrupal(props: IModalProps): JSX.Element {
  const [medias, setMedias] = useState([]);
  const [files, setFiles] = useState<File | null>(null);

  useEffect(() => {
    axios
      .get(props.route_to_media)
      .then((res) => setMedias(res?.data?.data))
      .catch((err) => console.error(err));
  }, []);

  const postImage = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      const document = await axios.post(
        props.api_url + 'article/' + props.chemin,
        files,
        {
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'file; filename="test.png"',
            Authorization: 'Basic ' + window.btoa(`apiuser:Vavaskale69!`),
          },
        }
      );
      props.setUploadId(document.data.data);
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
                {medias?.map((i: IMap) => (
                  <div className="mod_box" key={i.id}>
                    <img
                      src={'http://localhost' + i?.attributes?.uri?.url}
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
                      value={props.altText}
                      onChange={(e) => props.setAltText(e.target.value)}
                    />
                  </div>
                  <div className="mod_update_input">
                    <TextField
                      id="outlined-name"
                      label="legend"
                      onChange={(e) => props.setTitle(e.target.value)}
                      value={props.title}
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
