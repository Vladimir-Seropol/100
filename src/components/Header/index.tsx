import Logo from "../Logo/Logo.tsx";
// import { Link } from "react-router-dom";
import style from "./style.module.css";
import { useIsMobile } from "../../hooks/index";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import Button from "../Buttons/ButtonRed/button.tsx";
import { Link } from "react-scroll";
// import SwitchTheme from "../SwitchTheme/index.tsx";

const Header = () => {
  const isMobile = useIsMobile();

  const handleClick = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="wrapper">
      <header className={style.container}>
        <div className={style.nav}>
         
            <Logo />
         
          {isMobile ? <MobileMenu /> : <DesktopMenu />}
          <Link className={style.cart} to={"/cart"}>Корзина</Link>
          {/* <span className={style.cart} >Корзина</span> */}
        </div>

        <div className={style.info}>
          <b className={style.SneakMax}>SneakMax</b>
          <h1>Кроссовки известных брендов с доставкой по России и СНГ</h1>
          <p>
            Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok, Converse и
            многие другие по низким ценам
          </p>
          <Button text="Перейти к покупкам" onClick={handleClick} />
          
        </div>
      </header>
    </div>
  );
};

export default Header;
