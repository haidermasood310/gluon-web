import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

type Props = {
  value: string | null | undefined;
  setValue: (value: string) => void;
};

const Editor = ({ value, setValue }: Props) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      console.log("Quill Editor Loaded");
    }
  }, []);

  return (
    <div className={"editor"}>
      <SunEditor
        setContents={value as string}
        onChange={(e) => {
          console.log("eee", e);
          setValue(e);
        }}
        setOptions={{
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize"],
            ["bold", "underline", "italic", "strike"],
            ["fontColor", "hiliteColor"],
            ["removeFormat"],
            // "/", // Line break
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["link"], // You must add the 'katex' library at options to use the 'math' plugin.
            /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
            ["showBlocks", "codeView"],
            ["preview", "print"],
          ],
        }}
      />
    </div>
  );
};

export default Editor;
