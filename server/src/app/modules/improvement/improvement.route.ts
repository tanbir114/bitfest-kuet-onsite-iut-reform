import express from 'express';
import { ImprovementController } from './improvement.controller';

const router = express.Router();

router.post('/create', ImprovementController.createImprovement);
router.put('/:improvementId', ImprovementController.updatedImprovement);
router.get('/getAll', ImprovementController.getAllImprovements);
router.get(
    '/getByAuthor/:authorId',
    ImprovementController.getImprovementByAuthor,
);

export const ImprovementRoute = router;
