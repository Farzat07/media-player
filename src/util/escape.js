// Escape some characters which can be found in file paths but have special
// meaning when in a browser's URL.
const escapeFileURL = (fileURL) =>
  fileURL.replace(/[=?%#]/g, encodeURIComponent);

export { escapeFileURL };
