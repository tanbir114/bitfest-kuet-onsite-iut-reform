import { useAppSelector } from '../../redux/hook';
import { useGetStoryByAuthorQuery } from '../../redux/features/improvement/improveApi';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { processTimestampWithDateFns } from '../../utils/formatTIme';
import { FilePenLine, Trash2 } from 'lucide-react';
import StoryModal from '../../components/story/StoryModel';

type Props = {};
const columns: GridColDef<(typeof rows)[number]>[] = [
    {
        field: 'title',
        headerName: 'Title',
        width: 200,
        editable: false,
    },
    {
        field: 'author',
        headerName: 'Author',
        width: 150,
        editable: false,
    },
    {
        field: 'content',
        headerName: 'Content',
        width: 450,
        editable: false,
    },
    {
        field: 'date',
        headerName: 'Date',
        type: 'string',
        width: 150,
    },
    {
        field: 'buttons',
        headerName: 'Action',
        width: 100,
        renderCell: (params) => (
            <div className="flex gap-4 items-center justify-center pt-4">
                <FilePenLine className="align-middle" />
                <Trash2 className="align-middle" />
            </div>
        ),
    },
];
const rows = [
    {
        id: 1,
        title: 'Title 1',
        author: 'Author 1',
        content: 'Content 1',
        date: '2021-09-01',
    },
];

const Stories = (props: Props) => {
    const user = useAppSelector((state) => state.auth.user);
    // console.log(user);
    const userId = user?.id || '';
    const { data: stories } = useGetStoryByAuthorQuery(userId);

    const rows = stories?.data?.map((story: any) => ({
        id: story._id,
        title: story.title,
        author: story.author.name,
        content: story.generatedContent,
        date: processTimestampWithDateFns(story.createdAt).formattedDate,
    }));
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="py-2 text-xl font-semibold">All Stories</div>
                <StoryModal />
            </div>

            <div className="w-full">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default Stories;
