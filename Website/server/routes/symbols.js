import express from 'express';

import {postSymbol} from '../controllers/symbols.js';

const router = express.Router();

router.post('/onePred', postSymbol);


export default router;