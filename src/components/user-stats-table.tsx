import { heading, tableBase, tableWrap } from "./ui-styles";

interface UserStatsTableProps {
    stats: { user: string; count: number }[];
}

export const UserStatsTable = ({ stats }: UserStatsTableProps) => {
    return (
        <div className={tableWrap}>
            <h2 className={heading}>Статистика по пользователям</h2>
            <div className="overflow-y-auto">
                <table className={tableBase}>
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="px-3 py-2 text-sm font-medium text-gray-700">
                                Пользователь
                            </th>
                            <th className="px-3 py-2 text-sm font-medium text-gray-700">
                                Сообщений
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {stats.map(({ user, count }) => (
                            <tr key={user} className="hover:bg-gray-50">
                                <td className="px-3 py-2">{user}</td>
                                <td className="px-3 py-2">{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
