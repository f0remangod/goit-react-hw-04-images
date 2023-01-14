import { Component } from 'react';
import { ModalStyled, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.shape({
      link: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    const { target, currentTarget } = event;

    if (target.value === currentTarget.value) {
      this.props.onClose();
    }
  };

  render() {
    const { link, alt } = this.props.image;
    const { onLoad } = this.props;

    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <img src={link} alt={alt} onLoad={() => onLoad()} />
        </ModalStyled>
      </Overlay>
    );
  }
}
