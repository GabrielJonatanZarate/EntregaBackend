import { Router } from "express"; 

const router = Router();

let carts = [];

router.get('/', (req, res) => {
    res.json(carts)
});

export default router;