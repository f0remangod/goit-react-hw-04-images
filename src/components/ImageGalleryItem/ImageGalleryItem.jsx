import {
  ImageGalleryItemImage,
  ImageGalleryItemStyled,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, tags } = image;

  return (
    <ImageGalleryItemStyled onClick={() => onClick(image)}>
      <ImageGalleryItemImage src={webformatURL} alt={tags} />
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
