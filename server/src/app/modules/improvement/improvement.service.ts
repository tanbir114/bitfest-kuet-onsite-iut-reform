import { VectorDatabase } from '../../utils/vectorDatabase';
import { TImprovement } from './improvement.interface';
import { ImprovementModel } from './improvement.model';

const createImrovementPostIntoDB = async (improvement: TImprovement) => {
    const newImprovement = await ImprovementModel.create(improvement);

    console.log(
        '[LOG : improvement.service > createImrovementPostIntoDB] Create Improvement Post: ',
        newImprovement,
    );

    return newImprovement;
};

const updateImprovementPostIntoDB = async (
    improvement: TImprovement,
    improvementId: string,
) => {
    const updatedImprovement = await ImprovementModel.findByIdAndUpdate(
        improvementId,
        improvement,
        {
            new: true,
        },
    );

    if (updatedImprovement?.status === 'approved') {
        const data = `Banglish Content: ${updatedImprovement?.originalContent} Bangla Content: ${updatedImprovement?.banglaContent}`;
        await VectorDatabase.loadDataIntoDB(data, 'banglish');
    }
    console.log(
        '[LOG : improvement.service > updateImprovementPostIntoDB] Update Improvement Post: ',
        updatedImprovement,
    );

    return updatedImprovement;
};

const getAllImprovementPostsFromDB = async () => {
    const improvement = await ImprovementModel.find();

    console.log(
        '[LOG : improvement.service > getImprovementPostFromDB] Get Improvement Post: ',
        improvement,
    );

    return improvement;
};

export const ImprovementService = {
    createImrovementPostIntoDB,
    updateImprovementPostIntoDB,
    getAllImprovementPostsFromDB,
};
