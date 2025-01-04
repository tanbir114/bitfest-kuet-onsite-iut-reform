import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Switch, TextareaAutosize, TextField } from '@mui/material';

import { useAppSelector } from '../../redux/hook';
import {
    useFinalStoryMutation,
    useInitialStoryMutation,
} from '../../redux/features/story/storyApi';
import { set } from 'date-fns';

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
    width: '100%',
    maxWidth: '800px',
};

function StoryModal() {
    const user = useAppSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [generatedContent, setGeneratedContent] = useState<string>('');
    const [statusChecked, setStatusChecked] = useState(false);
    const [storyId, setStoryId] = useState<string>('');

    const [generateBanglish, { isLoading: generateLoading }] =
        useInitialStoryMutation();

    const [createStory, { isLoading: createLoading }] = useFinalStoryMutation();

    const hangleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const story = {
                title,
                originalContent: content,
                generatedContent: generatedContent,
                author: user?.id || '',
                tags: tags.split(','),
                status: statusChecked ? 'private' : 'public',
            };

            const response = await createStory({ story, storyId });
            console.log(response);
            handleClose();
        } catch (error) {}
    };

    const handleGenerate = async (e: any) => {
        e.preventDefault();

        try {
            const story = {
                title,
                originalContent: content,
                author: user?.id || '',
                tags: tags.split(','),
                status: statusChecked ? 'private' : 'public',
            };

            const response = await generateBanglish(story);
            console.log(response);
            setGeneratedContent(response?.data?.data?.generatedContent);
            setTitle(response?.data?.data?.title);
            setStoryId(response?.data?.data?.newStory?._id);
            console.log(
                response?.data?.data?.generatedContent,
                response?.data?.data?.title,
            );
        } catch (error) {}
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusChecked(event.target.checked);
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
                        <div className="flex justify-between flex-col">
                            <div>
                                <h2 className="text-xl font-semibold py-4">
                                    Create Story
                                </h2>
                            </div>

                            <form className="flex flex-col gap-6 w-full min-w-[350px]">
                                <TextField
                                    id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                    className="w-full "
                                    size="small"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <TextareaAutosize
                                    aria-label="maximum rows"
                                    maxRows={15}
                                    minRows={12}
                                    placeholder="Content"
                                    className="border-2 border-gray-300 rounded-md p-2"
                                    value={generatedContent || content}
                                    onChange={(e) => {
                                        generatedContent
                                            ? setGeneratedContent(
                                                  e.target.value,
                                              )
                                            : setContent(e.target.value);
                                    }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Tags"
                                    placeholder="Comma separated tags"
                                    variant="outlined"
                                    className="w-full "
                                    size="small"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                                <div className="flex gap-4 items-center">
                                    <span>Make Private </span>{' '}
                                    <Switch
                                        checked={statusChecked}
                                        onChange={handleChange}
                                        inputProps={{
                                            'aria-label': 'controlled',
                                        }}
                                    />
                                </div>
                            </form>
                            <div className="flex gap-2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={handleGenerate}
                                    disabled={generateLoading}
                                >
                                    Generate
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={hangleSubmit}
                                    disabled={createLoading}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Box>
                </>
            </Modal>
        </>
    );
}

export default StoryModal;
