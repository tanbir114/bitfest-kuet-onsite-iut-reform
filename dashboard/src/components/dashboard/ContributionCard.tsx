import { BookType, HeartHandshake } from 'lucide-react';
import { useGetImproveByAuthorQuery } from '../../redux/features/improvement/improveApi';
import { useAppSelector } from '../../redux/hook';

function ContributionCard() {
    const user = useAppSelector((state) => state.auth.user);
    const userId = user?.id || '';

    const { data: contributions } = useGetImproveByAuthorQuery(userId);
    console.log(contributions);
    return (
        <div className="w-96 h-56 bg-green-300 rounded-lg p-10 flex items-center justify-between">
            <div className="flex flex-col h-full justify-evenly  items-center flex-1">
                <HeartHandshake size={60} />
                <span className=" text-6xl font-bold">
                    {contributions?.data?.length || 0}
                </span>
            </div>
            <h2 className="text-4xl font-semibold flex-[2]">Contribution</h2>
        </div>
    );
}

export default ContributionCard;
