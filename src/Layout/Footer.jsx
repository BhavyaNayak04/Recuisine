export default function Footer() {
  return (
    <div className="p-5 bottom-0  text-white bg-orange-700 flex justify-between sm:justify-around items-start caption flex-wrap sm:flex-nowrap gap-4">
      <div>
        <p className="font-semibold text-2xl">
          <span className="text-2xl">R</span>ecuisine
        </p>
        <p className="text-xs text-wrap">lets stop food wastage, together</p>
      </div>
      <div className="flex flex-col space-y-4">
        <a href="/search">Home</a>
        <a href="/search">Search</a>
        <a href="/donate">Donate</a>
        <a href="/about">About</a>
        <a href="/profile">Profile</a>
      </div>
      <div className="flex flex-col space-y-4">
        <a href="/">Developers</a>
        <a href="/">Social Media</a>
        <a href="/">Learn about food waste</a>
        <a href="/">WHO</a>
      </div>
    </div>
  );
}
