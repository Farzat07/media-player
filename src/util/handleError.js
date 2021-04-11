// Check what type of error it is, log it to the console, and return an object
// containing the status code, the statusText, and the description in the data
// property.
export const handleAxiosError = (error) => {
  if (error.response) {
    console.error(error.response);
    const doc = document.implementation.createHTMLDocument("");
    // We can do this because we know the source is safe.
    // Otherwise shouldn't be used.
    doc.documentElement.innerHTML = error.response.data;
    error.response.data = doc.querySelector("p").textContent;
    return error.response;
  }

  if (error.request) {
    console.error(error.request);
    return {
      status: "5XX",
      statusText: "UNKOWN SERVER ERROR",
      data:
        "It seems that an error has occured on the server and no response was received.",
    };
  }

  console.error(error.message);
  return {
    status: "4XX",
    statusText: "UNKOWN CLIENT ERROR",
    data:
      "Seems that something happened in setting up the request that triggered an error.",
  };
};
