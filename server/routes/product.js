import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct, getProducts, getProductById, deleteProduct, updateProduct ,searchProducts} from '../controller/productController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ✅ Use 'images' here to match frontend
router.post('/add', upload.array('images', 5), addProduct);
router.put('/update/:id', upload.array('images', 5), updateProduct);

router.get('/get', getProducts); 
router.get('/get/:id', getProductById);
router.delete('/delete/:id', deleteProduct);
router.post('/search', searchProducts);

export default router;
