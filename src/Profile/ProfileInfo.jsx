export default function ProfileInfo() {
  return (
    <>
      <div className="py-3 flex flex-col gap-4 bg-orange-200 items-center justify-center rounded-xl">
        <div className="flex-shrink-0">
          <img
            src="/profile.jpg"
            className="rounded-full"
            height={90}
            width={90}
          />
        </div>
        <div className="text-justify space-y-2 caption">
          <p className="font-bold">Bhavya</p>
          <p>bhavyanayak@gmail.com</p>
          <p>8748035788</p>
        </div>
      </div>
    </>
  );
}
