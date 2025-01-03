import express from 'express';
import { ImprovementController } from './improvement.controller';

const router = express.Router();

router.post('/create', ImprovementController.createImprovement);
router.put('/:improvementId', ImprovementController.updatedImprovement);
router.get('/getAll', ImprovementController.getAllImprovements);

export const ImprovementRoute = router;
