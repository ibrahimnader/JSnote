import React, { useEffect, useRef } from "react";
import "./preview.css";
interface PreviewProps {
  code: string;
  error: string;
}

const html = `
  <html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
    const handleError=(err)=>{
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      console.error(err);
    }  
  
      window.addEventListener('message', (event) => {
        const root = document.querySelector('#root');
        try {
          eval(event.data);
        } catch (err) {
          handleError(err)
                  }
      }, false);
    </script>
  </body>
</html>

  `;
export const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcDoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  return (
    <div className="previewWrapper">
      <iframe
        className="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
        title="code"
      ></iframe>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
