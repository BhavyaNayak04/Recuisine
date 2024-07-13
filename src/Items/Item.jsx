export default function Item({ item }) {
  return (
    <>
      <div className="flex justify-between gap-4 items-start">
        <div>
          <p className="subheading">{item.name}</p>
          <p className="caption">{item.restName}</p>
          <p className="body">{item.address}</p>
          <p className="body">{item.number}</p>
        </div>
        <div>
          <img
            src={item.url}
            height={160}
            width={160}
            alt="food"
            className="rounded-xl"
          />
        </div>
      </div>
      <p className="body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        dolorem incidunt ab debitis reprehenderit inventore reiciendis maiores
        eaque ad quibusdam ducimus praesentium ratione vitae non ullam deleniti
        illo culpa error quasi vel saepe quae, doloribus dolor itaque?
        Voluptatem dolorum explicabo totam ex iusto, dignissimos esse excepturi
        nam laborum reprehenderit sequi. Officia veniam repellat provident
        consequatur tenetur sed corporis velit, consectetur, dignissimos eos,
        perferendis incidunt laudantium sit. Quod cum nesciunt iusto minus totam
        consequuntur. Quo quod corrupti laudantium debitis atque ex quam,
        voluptates accusantium esse necessitatibus quaerat adipisci temporibus
        maiores odio suscipit perspiciatis hic explicabo maxime et beatae sed
        numquam quasi?
      </p>
    </>
  );
}
