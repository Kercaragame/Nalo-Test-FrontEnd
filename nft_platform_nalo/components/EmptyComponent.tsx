export default function EmptyComponent({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-zinc-400 font-semibold text-xs">{text}</p>
        </div>
      </div>
    </>
  );
}
