import { toast } from 'react-toastify';
import {
  Form,
  Header,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    const { value } = event.currentTarget;

    setInputValue(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      toast.error('Search query can not bee empty.', {
        theme: 'dark',
      });
      return;
    }
    onSubmit(inputValue);
    clearForm();
  };

  const clearForm = () => {
    setInputValue('');
  };

  return (
    <Header>
      <Form className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>🔍</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          onChange={handleInputChange}
          className="input"
          value={inputValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
