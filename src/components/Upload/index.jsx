import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadComponent = ({ onFileChange, defaultValue }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultValue);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });

      if (onFileChange) onFileChange(info.file.originFileObj);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải hình lên</div>
    </div>
  );

  const dummyRequest = (options) => {
    const { onSuccess } = options;

    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  useEffect(() => {
    setImageUrl(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadComponent;
