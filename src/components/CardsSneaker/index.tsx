import style from './style.module.css';
import CardSneaker from '../CardSneaker';
import { FC, useEffect, useState } from 'react';
import { Sneaker } from '../../types/sneaker';
import Button from '../Buttons/ButtonRed/button';

type Props = {
  filterFunction: (sneakers: Sneaker[]) => Sneaker[];
}

const CardsSneaker: FC<Props> = ({ filterFunction }) => {
  const [initiSneakers, setInitiSneakers] = useState<Sneaker[]>([]);
  const [updateSneakers, setUpdateSneakers] = useState<Sneaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // Количество видимых кроссовок

  const getData = async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const req = await fetch('https://01d736031dee7633.mokky.dev/sneakers');
      const data = await req.json();

      if (data) {
        setInitiSneakers(data);
        setUpdateSneakers(data);
      }
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filteredSneakers = filterFunction(initiSneakers);
    setUpdateSneakers(filteredSneakers);
    setVisibleCount(6); // Сбросить количество видимых кроссовок при изменении фильтра
  }, [filterFunction, initiSneakers]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Увеличить количество видимых кроссовок на 6
  };

  return (
    <div className={style.container}>
      {isLoading && <p>...loading</p>}
      {isError && <p>Server is dead</p>}
      {updateSneakers.slice(0, visibleCount).map((sneaker) => (
        <CardSneaker data={sneaker} key={sneaker.id} />
      ))}
      {visibleCount < updateSneakers.length && (
        <Button text="Показать еще" onClick={loadMore} />
      )}
    </div>
  );
}

export default CardsSneaker;


























// import style from './style.module.css';
// import CardSneaker from '../CardSneaker';
// import { FC, useEffect, useState } from 'react';
// import { Sneaker } from '../../types/sneaker';
// import Button from '../Buttons/ButtonRed/button';

// type Props = {
//   filterValue: string;
//   price: number;
// }

// const CardsSneaker: FC<Props> = ({ filterValue }) => {
//   const [initiSneakers, setInitiSneakers] = useState<Sneaker[]>([]);
//   const [updateSneakers, setUpdateSneakers] = useState<Sneaker[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(6); // Количество видимых кроссовок

//   const getData = async () => {
//     try {
//       setIsError(false);
//       setIsLoading(true);

//       const req = await fetch('https://01d736031dee7633.mokky.dev/sneakers');
//       const data = await req.json();

//       if (data) {
//         setInitiSneakers(data);
//         setUpdateSneakers(data);
//       }
//     } catch (e) {
      
//       setIsLoading(false);
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     if (filterValue) {
//     //   const newArray = initiSneakers.filter((item) => item.title.includes(filterValue));
//     const newArray = initiSneakers.filter((item) => item.price === filterValue);
//       setUpdateSneakers(newArray);
//     } else {
//       setUpdateSneakers(initiSneakers);
//     }
//     setVisibleCount(6); // Сбросить количество видимых кроссовок при изменении фильтра
//   }, [filterValue, initiSneakers]);

//   const loadMore = () => {
//     setVisibleCount((prevCount) => prevCount + 6); // Увеличить количество видимых кроссовок на 6
//   };

//   return (
//     <div className={style.container}>
//       {isLoading && <p>...loading</p>}
//       {isError && <p>Server is dead</p>}
//       {updateSneakers.slice(0, visibleCount).map((sneaker) => (
//         <CardSneaker data={sneaker} key={sneaker.id}  />
//       ))}
//       {visibleCount < updateSneakers.length && (
//         <Button text="Показать еще" onClick={loadMore} />
//       )}
//     </div>
//   );
// }

// export default CardsSneaker;