import { Link } from "react-router-dom";

type Props = {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function MenuCard({ to, icon, title, description }: Props) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl w-70 h-70 shadow-sm transition flex flex-col items-center justify-center text-center "
    >
      <div className="w-20 h-20 flex items-center justify-center bg-slate-100 rounded-full mb-3">
        {icon}
      </div>
      <div className="font-semibold text-lg">{title}</div>
      <div className="text-sm text-slate-500">{description}</div>
    </Link>
  );
}
