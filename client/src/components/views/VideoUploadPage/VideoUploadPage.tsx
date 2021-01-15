import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Typography, Button, Form, Input, Icon } from "antd";
import axios from "axios";

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

const VideoUploadPage = () => {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrivate(+e.currentTarget.value);
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files: any) => {
    let formData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      console.log(res);
      if (res.data?.ok) {
      } else {
        alert("video upload failed");
      }
    });
  };

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
            {/*Drop zone*/}
            <Dropzone onDrop={onDrop} multiple={false} maxSize={100000}>
              {({ getRootProps, getInputProps }) => (
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
              )}
            </Dropzone>

            {/*Thumbnail*/}
            <div>
              <img src={""} alt={""} />
            </div>
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

          <Button type="primary" size="large">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default VideoUploadPage;
