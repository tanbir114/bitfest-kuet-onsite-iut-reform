import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Grid2, Switch } from '@mui/material';
import { useUpdateImproveMutation } from '../../redux/features/improvement/improveApi';
import { toast } from 'sonner';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
};

type Props = {
    text: {
        banglish: string;
        bangla: string;
        author: string;
        id: string;
        status: string;
    };
};
function ImprovementModal({ text }: Props) {
    const { banglish, bangla, author, id, status } = text;

    const [checked, setChecked] = useState(
        status === 'approved' ? true : false,
    );

    const [update, { isLoading }] = useUpdateImproveMutation();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        const toastId = toast.loading('Updating...', { duration: 1000 });
        await update({
            id,
            status: event.target.checked ? 'approved' : 'rejected',
        });

        if (!isLoading) {
            toast.success('Updated', {
                duration: 2000,
                id: toastId,
            });
            handleClose();
        }
    };

    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style}>
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl font-semibold py-4">
                                    Contribution
                                </h2>
                                <p className="font-semibold py-2">
                                    Contributed By: {author}
                                </p>
                            </div>
                            {status === 'pending' && (
                                <div>
                                    <span>Approve</span>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{
                                            'aria-label': 'controlled',
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <Grid2
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid2 size={6}>{banglish}</Grid2>
                            <Grid2 size={6}>{bangla}</Grid2>
                        </Grid2>
                    </Box>
                </>
            </Modal>
        </>
    );
}

export default ImprovementModal;
