import Resizer from "react-image-file-resizer";

// file, -> is the file of the image which will resized.
// maxWidth, -> is the maxWidth of the resized new image.
// maxHeight, -> is the maxHeight of the resized new image.
// compressFormat, -> is the compressFormat of the resized new image.
// quality, -> is the quality of the resized new image.
// rotation, -> is the degree of clockwise rotation to apply to uploaded image.
// responseUriFunc, -> is the callBack function of the resized new image URI.
// outputType,  -> is the output type of the resized new image.
// minWidth, -> is the minWidth of the resized new image.
// minHeight -> is the minHeight of the resized new image.

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      150,
      150,
      "JPEG",
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
});

export default resizeFile;