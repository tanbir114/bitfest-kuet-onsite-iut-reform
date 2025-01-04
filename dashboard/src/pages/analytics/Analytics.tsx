import { UserRoundCheck } from 'lucide-react';
import LineChartComponent from '../../components/dashboard/LineChartComponent';
import SparkLineComponent from '../../components/dashboard/SparkLineComponent';

import StoryCard from '../../components/dashboard/StoryCard';
import ContributionCard from '../../components/dashboard/ContributionCard';
import { useAppSelector } from '../../redux/hook';
type Props = {};

function Analytics({}: Props) {
    const user = useAppSelector((state) => state.auth.user);
    console.log(user);
    const userId = user?.id || '';
    console.log(userId);
    return (
        <div>
            <div className="py-4 text-xl font-semibold">
                Dashboard Analytics
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3">
                <StoryCard />
                <ContributionCard />
                <div className="w-96 h-56 bg-[#60BDD2] rounded-lg p-10 flex items-center justify-between">
                    <div className="flex flex-col h-full items-center justify-evenly flex-1">
                        <UserRoundCheck size={60} />
                        <span className=" text-6xl font-bold">35</span>
                    </div>
                    <h2 className="text-4xl font-semibold flex-[2]">
                        Followers
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
                <div>
                    <SparkLineComponent />
                </div>
                <div>
                    <LineChartComponent />
                </div>
            </div>
        </div>
    );
}

export default Analytics;
