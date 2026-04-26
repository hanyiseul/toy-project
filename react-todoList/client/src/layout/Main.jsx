const Main = ({ children }) => {
  return (
    <main className="w-full flex justify-center mt-10 px-4">
      <section className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        {children}
      </section>
    </main>
  );
};

export default Main;