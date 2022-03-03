import React, { useEffect } from "react";

const Translate = () => {
  useEffect(() => {

    if (window.document.scrollingElement.hasAttribute("style")) {
      window.document.scrollingElement.setAttribute("style", "");
    }
  });

  return (
    <div id="google_translate_element"></div>
  );
};

export default Translate;
