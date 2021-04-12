import React, { useState, useEffect, useRef } from "react";
import Alert from "react-bootstrap/Alert";

function CopyAlert(props) {
  const { copyText, onClose } = props;
  const [success, setSuccess] = useState(false);
  const textElement = useRef(null);

  useEffect(() => {
    if (copyText) {
      navigator.clipboard.writeText(copyText).then(
        () => setSuccess(true),
        () => setSuccess(false)
      );

      // Select the text in textElement for quick copying.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textElement.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const timeoutId = setTimeout(onClose, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyText, onClose]);

  return (
    <Alert
      variant={success ? "success" : "danger"}
      onClose={onClose}
      show={Boolean(copyText)}
      dismissible
    >
      <Alert.Heading>
        {success
          ? "The following has been copied successfully to the clipboard:"
          : "Couldn't access the clipboard - you can copy it manually though:"}
      </Alert.Heading>
      <p ref={textElement}>{copyText}</p>
    </Alert>
  );
}

export default CopyAlert;
