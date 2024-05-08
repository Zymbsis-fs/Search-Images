import { FC, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const valueForSearch: string = (
      form.elements.namedItem('search') as HTMLInputElement
    ).value.trim();
    !valueForSearch
      ? toast.error('Search request can not be empty')
      : onSearch(valueForSearch);
  };

  return (
    <header className={css.header}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            width: 600,
            height: 75,
            paddingLeft: 25,
            fontSize: 18,
          },
        }}
      />
    </header>
  );
};
export default SearchBar;
