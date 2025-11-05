interface UserStatsTableProps {
    stats: { user: string; count: number }[];
}

export const UserStatsTable = ({ stats }: UserStatsTableProps) => {
    return (
        <div className="p-4 max-h-[500px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">
                Статистика по пользователям
            </h2>
            <table className="min-w-full border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="text-left px-3 py-2 border-b">
                            Пользователь
                        </th>
                        <th className="text-right px-3 py-2 border-b">
                            Сообщений
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map(({ user, count }) => (
                        <tr key={user} className="border-b hover:bg-gray-50">
                            <td className="px-3 py-2">{user}</td>
                            <td className="px-3 py-2 text-right">{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
