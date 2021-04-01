import React, { useCallback } from 'react';
import {storage} from '../../firebase';
import ImagePreview from '../Products/ImagePreview';
import * as RiIcons from "react-icons/ri";
import styled from 'styled-components';

const Images = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    img {
        margin: 0 0.6em 1em 0.6em;
    }
`;

const TextArea = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    transition: all ease-out .3s;
    :hover {
        color: #ea352d;
        transition: all ease-out .3s;
    }
    p {
        padding-right: 0.8em;
    }
`;

const ImageArea = (props) => {

    // -----------------
    // deleteImage
    // -----------------
    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？');
        if (!ret) {
            return false
        } else {
            const newImages = props.images.filter(image => image.id !== id)
            props.setImages(newImages);
            return storage.ref('images').child(id).delete()
        }
    }, [props.images])

    // -----------------
    // uploadImage
    // -----------------
    const uploadImage = useCallback((event) => {
        const file = event.target.files;
        let blob = new Blob(file, { type: "image/jpeg" });
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')
    
        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);
                              
        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                props.setImages((prevState => [...prevState, newImage]))
            });
        })
    }, [props.setImages])


 return(
  <div>

      <Images>
         {props.images.length > 0 && (
                 props.images.map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} />)
             )}
      </Images>

      <TextArea>

         <p> <span>商品画像を登録する</span></p>
          <label>
          <RiIcons.RiImageAddFill className="add__Image" />
          <input className="icon-hide" type="file"
                 onChange={(event) => uploadImage(event)}
                  />
          </label>

      </TextArea>
  </div>
 )
}

export default ImageArea;