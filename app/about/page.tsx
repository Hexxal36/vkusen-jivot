import Link from "next/link";

export const dynamic = "force-static";

const AboutPage = () => {
  return (
    <>
      <h1>За нас</h1>

      <p style={{ opacity: 0.85, maxWidth: 760 }}>
        „Вкусен живот“ е малък, статичен сайт с рецепти — направен да е бърз, лек и удобен.
        Няма профили, няма коментари, няма сложни системи. Само рецепти, които можеш да отвориш
        и да сготвиш.
      </p>

      <h2 style={{ marginTop: 18 }}>Какво ще намериш тук</h2>
      <ul>
        <li>Подбрани рецепти с ясни стъпки</li>
        <li>Кратко време за подготовка (където е възможно)</li>
        <li>Традиционни и модерни идеи</li>
      </ul>

      <h2 style={{ marginTop: 18 }}>Искаш да предложиш рецепта?</h2>
      <p style={{ opacity: 0.85 }}>
        Пиши ни и ще я добавим в следващ ъпдейт.
      </p>

      <div className="metaRow" style={{ marginTop: 14 }}>
        <Link className="badge" href="/contact">Контакти →</Link>
        <Link className="badge" href="/recipes">Рецепти</Link>
      </div>
    </>
  );
};

export default AboutPage;
