/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { loadNewPhotos } from "../Store/reducers/photo";
import { useDispatch} from "react-redux";
import PhotosContent from "./PhotosContent";

const Photos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNewPhotos(1));
  }, [dispatch]);

  

  return <div>
     <PhotosContent />
  </div>;
};

export default Photos;
