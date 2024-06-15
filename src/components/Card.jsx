import { useState } from 'react';
import Modal from './Modal';

const Card = ({ book }) => {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState(null);

  return (
    <>
      {book.map((item, index) => {
        let thumbnail =
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
        if (thumbnail != undefined && amount != undefined) {
          return (
            <div
              className='card'
              onClick={() => {
                setShow(true);
                setItem(item);
              }}
              key={item.id}>
              {' '}
              <img src={thumbnail} alt='' />
              <div className='bottom'>
                <h3 className='title'>{item.volumeInfo.title}</h3>
                <p className='amount'>&#8377;{amount}</p>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}

      {show && <Modal show={show} item={bookItem} onClose={() => setShow(false)} />}
    </>
  );
};

export default Card;
