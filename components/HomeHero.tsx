import Link from "next/link";

const HomeHero = () => {
  return (
    <section className="heroBanner">
      <div className="heroOverlay">
        <p className="heroKicker">Вкусен живот</p>
        <h1 className="heroTitle">Рецепти, които се готвят лесно и се помнят дълго</h1>
        <p className="heroSubtitle">
          Подбрани идеи за всеки ден — без профили, без шум. Само рецепти.
        </p>

        <div className="heroActions">
          <Link className="btnPrimary" href="/recipes">
            Разгледай рецептите →
          </Link>
          <Link className="btnGhost" href="/about">
            За нас
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
