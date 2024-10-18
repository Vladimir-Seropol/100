import { FC } from "react";
import style from "./style.module.css";
import { Sneaker } from "../../types/sneaker";
import { Link } from "react-router-dom";

type Props = {
  data: Sneaker;
};

const CardSneaker: FC<Props> = ({ data }) => {
  return (
    <div className={style.card}>
      <div className={style.product_block}>
        <img src={data.imgUrl} alt="" />
        {/* <p>{data.title}</p> */}
        <h2>
          {data.title}
        </h2>
        <p>{data.price} p</p>
        <div className={style.add_block}>
          <Link to={`/sneaker/${data.id}`}>
            <img src="src/assets/View_product.png" alt="" />
          </Link>
          <Link to={`/cart/${data.id}`}>
            <img src="src/assets/Add_cart.png" alt="" />
          </Link>
        </div>
      </div>

      {/* <div className={style.info}>
       
      </div> */}
    </div>
  );
};

export default CardSneaker;
