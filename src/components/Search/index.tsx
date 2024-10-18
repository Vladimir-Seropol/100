import { ChangeEvent, Dispatch, FC, useContext, useState } from "react";
import style from "./style.module.css";
import ButtonDark from "../Buttons/ButtonDark/button";
import { ThemeContext } from "../../App";
import ButtonLight from "../Buttons/ButtonLight/button";

type Props = {
  setFilterValue: Dispatch<React.SetStateAction<(sneakers: any[]) => any[]>>;
};

const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43];
const genders = ["мужской", "женский"]; // Возможные значения пола

const Search: FC<Props> = ({ setFilterValue }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]); // Состояние для пола

  const { theme } = useContext(ThemeContext)!;
  const backgroundStyle =
    theme === "dark"
      ? { background: "none" }
      : { background: "rgba(255, 244, 238, 1)" };

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };

  const handleSizeSelect = (size: number) => {
    setSelectedSizes(
      (prevSizes) =>
        prevSizes.includes(size)
          ? prevSizes.filter((s) => s !== size) // Удаляем размер, если он уже выбран
          : [...prevSizes, size] // Добавляем размер, если он не выбран
    );
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGenders(
      (prevGenders) =>
        prevGenders.includes(gender)
          ? prevGenders.filter((g) => g !== gender) // Удаляем пол, если он уже выбран
          : [...prevGenders, gender] // Добавляем пол, если он не выбран
    );
  };

  const handleClick = () => {
    const min = parseFloat(minPrice) || 0; // Если не введено значение, по умолчанию 0
    const max = parseFloat(maxPrice) || Infinity; // Если не введено значение, по умолчанию Infinity

    setFilterValue(
      () => (products: any[]) =>
        products.filter(
          (product) =>
            product.price >= min &&
            product.price <= max &&
            (selectedSizes.length > 0
              ? selectedSizes.includes(product.size)
              : true) &&
            (selectedGenders.length > 0
              ? selectedGenders.includes(product.gender)
              : true) // Фильтрация по полу
        )
    );
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedSizes([]);
    setSelectedGenders([]);
    
    // Сброс фильтра
    setFilterValue(() => (products: any[]) => products);
  };


  return (
    <div className={style.container} style={backgroundStyle}>
        <h3 className={style.title}>Подбор <br />
        по параметрам</h3>
        <p className={style.price}>Цена, руб</p>
      <input className={style.price_input}
        value={minPrice}
        type="number"
        placeholder="Минимальная цена"
        onChange={handleMinPriceChange}
      />
      <input className={style.price_input}
        value={maxPrice}
        type="number"
        placeholder="Максимальная цена"
        onChange={handleMaxPriceChange}
      />
        <p className={style.gender}>Пол</p>
      <div className={style.genders}>
        {genders.map((gender) => (
          <label key={gender} className={style.gender_label}>
            <input
              className={style.check_input}
              type="checkbox"
              value={gender}
              checked={selectedGenders.includes(gender)}
              onChange={() => handleGenderSelect(gender)}
            />
           <span className={style.check_style}></span> 
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
            
          </label>
        ))}
      </div>

      <div className={style.sizes}>
        {sizes.map((size) => (
          <button
            key={size}
            className={`${style.size_button} ${
              selectedSizes.includes(size) ? style.selected : ""
            }`}
            onClick={() => handleSizeSelect(size)}
            style={backgroundStyle}
          >
            {size}
          </button>
        ))}

        <div className={style.button}>
          <ButtonDark text={"Применить"} onClick={handleClick} />
          <div className={style.button_light}>
            <ButtonLight text={"cбросить"} onClick={handleReset} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
