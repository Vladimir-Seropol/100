import { useState } from "react";
import Search from "../Search";
import style from "./style.module.css";
import CardsSneaker from "../CardsSneaker";
//import theme from "../../components/SwitchTheme";

const SectionSneakers = () => {
    const [filterFunction, setFilterFunction] = useState<() => (sneakers: any[]) => any[]>(() => (sneakers) => sneakers);


//   const [filterValue, setFilterValue] = useState("");
  return (
    
    <section className="container"  id="catalog">
      <div className={style.container}>
        <h2 className={style.title}>Каталог</h2>
        <div className={style.sneakers_block}>
        <Search setFilterValue={setFilterFunction} />
        <CardsSneaker filterFunction={filterFunction} />

        </div>
        
      </div>
    </section>
  );
};

export default SectionSneakers;
