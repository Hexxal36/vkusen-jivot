import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <h1>Няма такава страница</h1>
      <p style={{ opacity: 0.85 }}>Възможно е рецептата да е премахната или адресът да е грешен.</p>
      <p style={{ marginTop: 14 }}>
        <Link className="badge" href="/recipes">Към рецепти →</Link>
      </p>
    </>
  );
};

export default NotFound;
