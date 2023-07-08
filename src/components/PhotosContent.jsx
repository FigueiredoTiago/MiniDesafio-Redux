/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { loadNewPhotos } from "../Store/reducers/photo";

const PhotosContent = () => {
    const { list } = useSelector((state) => state.photo);
    const { page, infinite } = useSelector((state) => state.photo);
    const dispatch = useDispatch();

    function handleClick() {
      dispatch(loadNewPhotos(page + 1));
    }


  return (
    <div>
      Fotos Atualizadas
      <ul>
        {list.map((photo) => (
          <li key={photo.id}>
            <h3>{photo.title}</h3>
            <img src={photo.src} width="300px" />
          </li>
        ))}
      </ul>

      {infinite && <button onClick={handleClick}>Load Fotos</button>}
      
    </div>
  );
}

export default PhotosContent