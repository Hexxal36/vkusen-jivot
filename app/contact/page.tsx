export const dynamic = "force-static";

const ContactPage = () => {
  return (
    <>
      <h1>Контакти</h1>

      <p style={{ opacity: 0.85, maxWidth: 760 }}>
        За предложения, корекции или идеи — пиши ни. Сайтът е статичен, затова контактът е най-лесно по имейл.
      </p>

      <div
        style={{
          marginTop: 16,
          border: "1px solid #eee",
          borderRadius: 18,
          padding: 18,
          background: "#fff",
          maxWidth: 560,
        }}
      >
        <p style={{ margin: 0 }}>
          Имейл:{" "}
          <a href="mailto:hello@vkusen-zhivot.com" style={{ textDecoration: "underline" }}>
            hello@vkusen-zhivot.com
          </a>
        </p>
      </div>
    </>
  );
};

export default ContactPage;
