import { ModalStyled, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

export const Modal = ({ image, onClose, onLoad }) => {
  const { link, alt } = image;

  const handleEscape = useCallback(
    event => {
      console.log('callback');
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  const handleBackdropClick = event => {
    const { target, currentTarget } = event;

    if (target.value === currentTarget.value) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={link} alt={alt} onLoad={() => onLoad()} />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    link: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
};
