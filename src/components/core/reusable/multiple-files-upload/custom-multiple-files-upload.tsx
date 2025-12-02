import CloseIcon from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Grid, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export type FilesMetaData = {
  name: string;
  type: string;
  preview: string;
  base64: string;
};

type MultipleFilesUploadProps = {
  onUpload: (base64: string) => void;
  initialValue?: string;
  placeholder?: string;
};

const CustomMultipleFilesUpload = (props: MultipleFilesUploadProps) => {
  const { onUpload, initialValue, placeholder } = props;
  const [uploadedFile, setUploadedFile] = useState<FilesMetaData | null>(() => {
    if (!initialValue) return null;
    return {
      name: "Insurance Card",
      type: "image/jpeg",
      preview: initialValue,
      base64: initialValue,
    };
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (
        acceptedFiles[0]?.type.includes("image/jpeg") ||
        acceptedFiles[0]?.type.includes("image/png")
      ) {
        const file = acceptedFiles[0];
        const base64Data = await convertToBase64(file);
        const newFile = {
          name: file.name,
          type: file.type,
          preview: URL.createObjectURL(file),
          base64: base64Data,
        };
        setUploadedFile(newFile);
        const pureBase64 = base64Data.includes("base64,")
          ? base64Data.substring(base64Data.indexOf(",") + 1)
          : base64Data;
        onUpload(pureBase64);
      }
    },
    [onUpload]
  );

  useEffect(() => {
    if (initialValue && !uploadedFile) {
      setUploadedFile({
        name: "Insurance Card",
        type: "image/jpeg",
        preview: initialValue,
        base64: initialValue,
      });
    }
  }, [initialValue, uploadedFile]);

  const handleDelete = (e:React.MouseEvent ) => {
    e.stopPropagation();
    setUploadedFile(null);
    onUpload("");
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        resolve(base64Data);
      };

      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: false,
  });

  return (
    <Grid container flexDirection={"column"} gap={2}>
      <div
        {...getRootProps()}
        style={{
          border: `1.5px dashed #E0E0E0`,
          width: "100%",
          padding: "3rem",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          borderRadius: "10px",
          cursor: "pointer",
          flexDirection: "column",
        }}
      >
        <Grid container justifyContent={"center"} rowGap={2}>
          <input {...getInputProps()} />
          {!uploadedFile ? (
            <>
              <Grid width={"100%"} container justifyContent={"center"}>
                <FileUploadOutlinedIcon
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "black",
                    backgroundColor: "#DDF0FF",
                    padding: "7px 12px",
                    borderRadius: "20px",
                  }}
                />
              </Grid>
              {isDragActive ? (
                <Typography variant="body1">Drop the file here</Typography>
              ) : (
                <Grid display={"flex"} flexDirection={"column"} gap={1}>
                  <Grid display={"flex"} flexDirection={"row"} gap={1}>
                    <Grid>
                      <Typography
                        variant="bodyRegular4" // Changed variant
                        textAlign={"center"}
                        color={"#74797B"}
                      >
                        {placeholder}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </>
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <img
                height={"140px"}
                width={"240px"}
                style={{ objectFit: "cover", borderRadius: 8 }}
                src={uploadedFile.preview}
                alt={uploadedFile.name}
              />
              <IconButton
                onClick={handleDelete}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "#fff",
                  zIndex: 2,
                  transform: "translate(40%, -40%)",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </div>
    </Grid>
  );
};

export default CustomMultipleFilesUpload;
