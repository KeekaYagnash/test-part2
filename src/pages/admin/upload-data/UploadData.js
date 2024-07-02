import { Alert, Box, Divider, Grid, Input } from "@mui/material";
import {
  ErrorRounded,
  InfoRounded,
  AnnouncementRounded,
} from "@mui/icons-material";
import Heading from "../../../components/ui/Heading";
import { SubmitButton } from "../../../components/ui/Button";
import UploadFormConfig from "./UploadDataFormConfig";
import { useEffect, useState } from "react";
import { validateDocument } from "../../../components/form/Validations";
import axios from "axios";
import InputField from "../../../components/ui/InputField";
// import { sha256 } from "js-sha256";

// const generateCanonicalHeaders = (headers) => {
//   return Object.keys(headers)
//     .sort()
//     .reduce((accumulator, header) => {
//       const headerValue = headers[header];

//       return `${accumulator}${encodeURI(header.toLowerCase())}:${encodeURI(headerValue.trim().replace(/ +/g, " "))}\n`;
//     }, "");
// };

// const signHeaders = (headers) => {
//   const canonicalHeaders = generateCanonicalHeaders(headers);

//   return {
//     signedHeadersList: Object.keys(headers).sort().map(h => h.toLowerCase()).join(","),
//     signedHeadersResult: ""
//   }
// };

// NOTE: This approach uses S3 REST API with signed Auth header
// (work in progress)
// const uploadDataFilePromise = async (file) => {
//   return new Promise((resolve, reject) => {
//     const bucketName = "data-upload-bucket-used-for-glue";
//     const bucketRegion = "af-south-1";
//     const endpoint = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${file.name}`;
//     const token = `AWS4-HMAC-SHA256 Credential=AKIASC435SOWK7VEME3O/20240628/af-south-1/s3/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-content-sha256;x-amz-date, Signature=3e7ad7f366e701e5b8c6caefac744ba8dead3e56c2789ee39feae108f252b886`;

//     if (token) {
//       try {
//         const requestConfig = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         };

//         axios
//           .put(endpoint, file, requestConfig)
//           .then((response) => {
//             if (response.status === 200) {
//               resolve(response);
//             } else {
//               reject(new Error(`Non-200 response received.`));
//             }
//           })
//           .catch((error) => {
//             reject(new Error(error.message));
//           });
//       } catch (error) {
//         reject(new Error(error.message));
//       }
//     } else {
//       reject(new Error("Missing authorisation token."));
//     }
//   });
// };

const uploadDataFileAsync = async (file) => {
  try {
    const baseURLCF = `https://data-upload-bucket-used-for-glue.s3.af-south-1.amazonaws.com/testglue`;
    const endpoint = `${baseURLCF}/${file.name}`;
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    const response = await axios.put(endpoint, file, options);

    console.log(response);

    return Promise.resolve(response);
  } catch (error) {
    console.log(error);

    return Promise.reject(error);
  }
};

const UploadData = () => {
  const pageTitle = "Upload & publish data";
  const [dataFile, setDataFile] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(false);
  const [userFeedback, setUserFeedbback] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const handleChange = () => {
    const fileInputElement = document.getElementById("dataFile");
    const file = fileInputElement.files[0];

    setDataFile(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    setProgress(true);
    setError(null);

    try {
      // await uploadDataFileAsync(dataFile);

      const resp = await axios.post(
        "https://jju9dqpfx2.execute-api.af-south-1.amazonaws.com/prod/myresource",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(resp.headers);

      setError(null);
      setUserFeedbback("Your document was uploaded successfully.");
      setDataFile("");

      setTimeout(() => setUserFeedbback(null), 5000);
      return Promise.resolve(resp);
    } catch (fileUploadError) {
      // console.error(`Could not upload the file`, fileUploadError);

      setUserFeedbback(null);
      setError(fileUploadError);
      setDataFile("");
    }

    setProgress(false);
  };

  useEffect(() => {
    if (!dataFile) {
      setIsInvalid(true);

      return;
    }

    const isDocument = validateDocument(dataFile.name);

    setValidationError(isDocument);
    setIsInvalid(isDocument !== null);
  }, [dataFile]);

  const inputFields = [
    {
      name: "dataFile",
      label: "",
      type: "file",
      value: dataFile,
      onChange: () => handleChange(),
    },
  ];

  return (
    <Box>
      <Heading text={pageTitle} />
      <Divider sx={{ mt: 0.0, mb: 3 }} />

      {error ? (
        <Alert icon={<ErrorRounded />} severity="error" sx={{ m: 1 }}>
          There was an unexpected problem:
          <pre>{error.message || "No details available"}</pre>
          {/* {error.stack ? <pre>{error.stack}</pre> : <></>} */}
        </Alert>
      ) : (
        <></>
      )}

      {validationError ? (
        <Alert icon={<AnnouncementRounded />} severity="warning" sx={{ m: 1 }}>
          {validationError}
        </Alert>
      ) : (
        <></>
      )}

      {userFeedback ? (
        <Alert icon={<InfoRounded />} severity="info" sx={{ m: 1 }}>
          {userFeedback}
        </Alert>
      ) : (
        <></>
      )}

      <form onSubmit={handleSubmit}>
        <Grid item container spacing={2}>
          {inputFields.map((field, index) => {
            return (
              <InputField
                field={field}
                key={`input-field${index}`}
                type="file"
                gridSizes={UploadFormConfig.gridSizes}
              />
            );
          })}
          <Grid item xs={12} sm={12} md={12}>
            <SubmitButton
              disabled={isInvalid}
              label="Submit data"
              type="submit"
              progress={progress}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UploadData;
