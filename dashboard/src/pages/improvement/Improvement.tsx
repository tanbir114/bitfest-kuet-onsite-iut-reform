import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetImproveQuery } from '../../redux/features/improvement/improveApi';
import { TImprovement } from '../../types';
import ImprovementModal from '../../components/improvement/ImprovementModal';

const columns: GridColDef<(typeof rows)[number]>[] = [
    {
        field: 'author',
        headerName: 'Author',
        width: 150,
        editable: false,
    },
    {
        field: 'banglish',
        headerName: 'Banglish Text',
        type: 'string',
        width: 300,
    },
    {
        field: 'bangla',
        headerName: 'Bangla Text',
        type: 'string',
        width: 300,
    },
    {
        field: 'status',
        headerName: 'Status',
        type: 'number',
        width: 150,
        renderCell: (params) => (
            <div>
                {params.value === 'approved' ? (
                    <div className="text-green-700 font-bold">Approved</div>
                ) : params.value === 'rejected' ? (
                    <div className="text-red-700 font-bold">Rejected</div>
                ) : (
                    <div className="text-yellow-600 font-bold">Pending</div>
                )}
            </div>
        ),
    },
    {
        field: 'improvmentModal',
        headerName: 'View Details',
        width: 150,
        renderCell: (params) => (
            <ImprovementModal
                text={{
                    banglish: params?.row?.banglish,
                    bangla: params?.row?.bangla,
                    author: params?.row?.author,
                    id: params?.row?.id,
                    status: params?.row?.status,
                }}
            />
        ),
    },
];

const rows = [
    { id: '1', banglish: 'Snow', bangla: 'Jon', author: '14', status: 'abcd' },
];

function Improvement() {
    const {
        data: improvementData,
        isLoading,
        error,
    } = useGetImproveQuery(undefined);

    console.log(improvementData);
    const rows = improvementData?.data.map((item: TImprovement, index: any) => {
        return {
            id: item._id,
            author: item.author.name,
            banglish: item.originalContent,
            bangla: item.banglaContent,
            status: item.status,
        };
    });

    return (
        <div>
            <div className="py-2 text-xl font-semibold">Contribution Table</div>

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
}

export default Improvement;
