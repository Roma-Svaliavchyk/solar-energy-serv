import productsModel from '../models/products.js';
import User from '../models/User.js';

export const update = async (req, res) => {
    try{
        const productsId = req.params.id;

        await productsModel.updateOne(
            {
                _id: productsId,
            },
            {
                Name: req.body.Name,
                price: req.body.price,
                description: req.body.description,          
            
            },
        );
        res.json({
            massage: "Товар оновлено!",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось оновити товар!',           
        })
    }
};

export const getOne = async (req, res) =>{
    try{
        const productsId = req.params.id;

        const doc = await productsModel.findOne({_id: productsId});

        if (!doc) {
            return res.status(404).json({ message: 'Товар не знайден' });
        }

        res.json(doc);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати товар!',           
        })
    }
}

export const remove = async (req, res) =>{
    try{
        const productsId = req.params.id;

        const doc = await productsModel.deleteOne({_id: productsId});

        res.json({
            message: "Успішно видалено"
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось видалити товар!',           
        })
    }
}


export const getAll = async (req, res) =>{
    try{
        const products =  await productsModel.find().exec();

        res.json(products);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати товари!',
           
        })
    }
}

export const create = async (req, res) => {
    try{
        const doc = new productsModel({
            Name: req.body.Name,
            price: req.body.price,
            description: req.body.description,
        })

        const products = await doc.save();

        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось створити товар! Заповніть всі поля!'            
        })
    }
}
