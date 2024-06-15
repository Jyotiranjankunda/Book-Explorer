import { useState } from 'react';
import Card from './Card';
import axios from 'axios';
import bg2 from '../assets/bg2.png';
import { Box, CircularProgress } from '@mui/material';

const Main = () => {
  const [search, setSearch] = useState('');
  const [bookData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBook = (e) => {
    if (e.key === 'Enter') {
      setIsLoading(true);
      setHasSearched(true);

      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${
            import.meta.env.VITE_API_KEY
          }&maxResults=40`,
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  };

  const handleSearchClick = () => {
    setIsLoading(true);
    setHasSearched(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${
          import.meta.env.VITE_API_KEY
        }&maxResults=40`,
      )
      .then((res) => setData(res.data.items))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className='header'>
        <div className='row1'>
          <h1>
            A room without books is like
            <br /> a body without a soul.
          </h1>
        </div>
        <div className='row2'>
          <h2>Find Your Favourite Book</h2>
          <div className='search'>
            <input
              type='text'
              placeholder='Enter Your Book Name'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={searchBook}
            />
            <button onClick={handleSearchClick}>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </div>
          <img src={bg2} alt='' />
        </div>
      </div>

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CircularProgress
            sx={{
              color: 'white',
              marginTop: '1rem',
            }}
          />
        </Box>
      ) : (
        <div className='container'>
          {!hasSearched ? (
            <p className='initialText'>Search your favourite book. &#x1F4DA;</p>
          ) : (
            <Card book={bookData} />
          )}
        </div>
      )}
    </>
  );
};
export default Main;
