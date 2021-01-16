import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Typography, Button, Form, Input, Icon } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

interface IOption {
  value: number;
  label: string;
}
const PrivateOptions: IOption[] = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions: IOption[] = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

const VideoUploadPage = (props: any) => {
  const user = useSelector((state: any) => state.user);

  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Privacy, setPrivacy] = useState(0);
  const [Categories, setCategories] = useState("Film & Animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrivacy(+e.currentTarget.value);
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategories(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in First");
    }

    if (
      VideoTitle === "" ||
      Description === "" ||
      Categories === "" ||
      FilePath === "" ||
      Duration === "" ||
      Thumbnail === ""
    ) {
      return alert("Please first fill all the fields");
    }

    const variables = {
      writer: user.userData.data?.userId,
      title: VideoTitle,
      description: Description,
      privacy: Privacy,
      filePath: FilePath,
      category: Categories,
      duration: Duration,
      thumbnail: Thumbnail,
    };

    axios.post("/api/video/uploadVideo", variables).then((res) => {
      if (res.data?.ok) {
        alert("video Uploaded Successfully");
        props.history.push("/");
      } else {
        alert("Failed to upload video");
      }
    });
  };

  const onDrop = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let formData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      // console.log(res);
      if (res.data?.ok) {
        const variable = {
          filePath: res.data.filePath,
          fileName: res.data.fileName,
        };
        setFilePath(res.data.filePath);

        // generate thumbnail
        axios.post("/api/video/thumbnail", variable).then((res) => {
          if (res.data?.ok) {
            console.log(res.data);
            setDuration(res.data.fileDuration);
            setThumbnail(res.data.thumbsFilePath);
          } else {
            alert("Failed to make the thumbnails");
          }
        });
      } else {
        alert("video upload failed");
      }
    });
  };

  const maxSize = 800000000;

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            marginTop: "2rem",
          }}
          onSubmit={() => null}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Dropzone
              onDrop={onDrop}
              multiple={false}
              maxSize={maxSize}
              accept="video/mp4"
            >
              {({ getRootProps, getInputProps, fileRejections }) => {
                return (
                  <>
                    <div
                      style={{
                        width: "300px",
                        height: "240px",
                        border: "1px solid lightgray",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <Icon type="plus" style={{ fontSize: "3rem" }} />
                    </div>
                    {fileRejections.length > 0 && (
                      <div className="input-feedback">
                        <ul>
                          {fileRejections.map(({ file, errors }: any) => (
                            <li key={file.path}>
                              {file.path} - {file.size} bytes
                              <ul>
                                {errors.map((e: any) => (
                                  <li key={e.code}>{e.message}</li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                );
              }}
            </Dropzone>

            {Thumbnail !== "" && (
              <div>
                <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
              </div>
            )}
          </div>
          <br />
          <br />

          <label>title</label>
          <Input onChange={onTitleChange} value={VideoTitle} />
          <br />
          <br />

          <label>Description</label>
          <TextArea onChange={onDescriptionChange} value={Description} />
          <br />
          <br />

          <select onChange={onPrivateChange}>
            {PrivateOptions.map((item: IOption, index: number) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />

          <select onChange={onCategoryChange}>
            {CategoryOptions.map((item: IOption, index: number) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />

          <Button type="primary" size="large" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default VideoUploadPage;
