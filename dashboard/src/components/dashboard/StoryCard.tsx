import { BookType } from 'lucide-react';
import { useGetStoryByAuthorQuery } from '../../redux/features/improvement/improveApi';
import { useAppSelector } from '../../redux/hook';

function StoryCard() {
    const user = useAppSelector((state) => state.auth.user);
    console.log(user);
    const userId = user?.id || '';
    const { data: stories } = useGetStoryByAuthorQuery(userId);
    return (
        <div className="w-96 h-56 bg-[#EC9677] rounded-lg p-10 flex items-center justify-between">
            <div className="flex flex-col h-full items-center justify-evenly flex-1">
                <BookType size={60} />
                <span className=" text-6xl font-bold">
                    {stories?.data?.length || 0}
                </span>
            </div>
            <h2 className="text-4xl font-semibold flex-[2]">Stories</h2>
        </div>
    );
}

export default StoryCard;
