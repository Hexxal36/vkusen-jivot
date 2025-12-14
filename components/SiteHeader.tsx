import Image from "next/image";
import Link from "next/link";

const SiteHeader = () => {
  return (
    <header className="header">
      <div className="container headerInner">
        <div className="logo">
          <Image height={50} width={50} src={"/logo.png"} alt="logo"/>
          <Link className="brand" href="/">
            Вкусен живот
          </Link>
        </div>

        <nav className="nav">
          <Link href="/recipes">Рецепти</Link>
          <Link href="/about">За нас</Link>
          <Link href="/contact">Контакти</Link>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
