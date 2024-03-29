const model = require('../models')


const checkphone = async (req, res, next) => {

    try {


        var data = req.body;
        if (data.phone) {


            var result= await model.user.findOne({where:{phone:data.phone}});

            if(result) {
                
                if(result.id== req.params.id){
                    next()
                }else{
                    res.status(200).json({message:"Phone number already taken"})
                }

            }else{
                next()

            }
            

        } else {
            next();
        }


    } catch (error) {

        res.status(500).json({ Error: "Server error" })
    }

}



module.exports = {
    checkphone: checkphone
};