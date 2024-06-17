import LUserModel from '../models/LUser.js';

export const update = async (req, res) => {
    try {        
        const userId = "666fa43f9853e66ec9d9f74d";
        const  email = req.body.email;
        const  token = req.body.token;

        await LUserModel.updateOne(
            {
                _id: userId,
            },
            {
                $set: { 
                    email: email,
                    token: token
                }
            }
        );
        res.json({
            message: "kor оновлено!" + "   " + req.body.email,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось оновити kor!',
        });
    }
};

export const getLUser = async (req, res) =>{
    try{
        const kor = await LUserModel.findOne({_id: "666fa43f9853e66ec9d9f74d"});

        if (!kor) {
            return res.status(404).json({ message: 'kor не знайден' });
        }

        res.json(kor);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати kor!',
           
        })
    }
}

export const getAll = async (req, res) =>{
    try{
        const order = await LUserModel.find().populate('LUser').exec();

        res.json(order);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати kor!',
           
        })
    }
}

export const getOne = async (req, res) =>{
    try{
        const LUserId = req.params.id;

        const doc = await LUserModel.findOne({_id: LUserId});

        if (!doc) {
            return res.status(404).json({ message: 'kor не знайден' });
        }

        res.json(doc);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати kor!',           
        })
    }
}


export const create = async (req, res) => {
    try{
        const doc = new LUserModel({
            email: req.body.email,  
            token: req.body.token,            
        })
        const luser = await doc.save();

        res.json(luser);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось створити kor!'            
        })
    }
}
