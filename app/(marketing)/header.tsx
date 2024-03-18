// its always a good practice to use export const when declaring components instead of using const and then export default which is used in for pages and not single components

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      Header
    </header>
  );
};
