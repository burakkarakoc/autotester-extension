export default function Lister({ list }) {
  return (
    <ul className="divide-y divide-gray-200">
      {list.map((item) => (
        <li key={item} className="py-4 flex">
          <img className="h-10 w-10 rounded-full" src={item} alt="" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{item}</p>
            <p className="text-sm text-gray-500">{item}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
