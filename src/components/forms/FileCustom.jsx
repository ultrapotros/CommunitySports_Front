import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";

window.Buffer = window.Buffer || require("buffer").Buffer;

    const Input = styled("input")({
        display: "none"
    });
    //The father component provides the function setFile and the state file
    export default function UploadFile({setFile,file}) {
        const [prevImage,setPrevImage] = useState(null)

        useEffect(() => {
            if (file) {
              const img = URL.createObjectURL(file)
              setPrevImage(img)
            }
          }, [file])

        return (
            <div className="file-input">
                 <div className="img-container">
                    {prevImage ? <img src={prevImage} alt='img not found' /> : null}
                </div>
                <label htmlFor="contained-button-file">
                    <Input
                        className="list--buttons"
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={(e)=> setFile(e.target.files[0])}
                        />
                    <Button variant="contained" component="span" className="list--buttons">
                        Upload Image
                    </Button>
                </label>
            
        </div>
        );
    }