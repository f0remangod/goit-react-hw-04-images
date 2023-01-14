import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  Form,
  Header,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = event => {
    const { value } = event.currentTarget;

    this.setState({
      inputValue: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast.error('Search query can not bee empty.', {
        theme: 'dark',
      });
      return;
    }

    this.props.onSubmit(this.state.inputValue);
    this.clearForm();
  };

  clearForm = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <Header>
        <Form className="form" onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>🔍</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleInputChange}
            className="input"
            value={this.state.inputValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}
