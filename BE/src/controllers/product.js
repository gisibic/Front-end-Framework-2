import Product from "../models/product"
import { productSchema } from "../schemas/product"

export const getAll = async (req, res) => {
    const { _page = 1, _limit = 20, _sort = "createAt", _order = "asc" } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        const { docs: products } = await Product.paginate({}, options);
        return res.status(201).json(products);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Sản phẩm đã được xóa thành công",
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

export const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Sản phẩm đã được cập nhật thành công",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}