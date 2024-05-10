import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = await mediaApi.getList({
          mediaType,
          mediaCategory,
          page: 1,
        });
        setMedias(response.results);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      }
    };

    fetchMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
      {error && <div>Error: {error}</div>}
    </AutoSwiper>
  );
};

export default MediaSlide;
