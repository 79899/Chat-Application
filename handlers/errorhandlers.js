const { stack } = require("../app");

 exports.catchErros = (fn) => {
    return function(req,res,next) {
        fn(req,res,next).catch((err)=> {
            if(typeof err === "string") {
                res.status(400).json({
                    mesage:err,
                });
            } else {
                next(err);
            }
        });
    };
 };

 exports.mongoseErrors = (err,req,res,next) => {
    if(!err.errors) return next(err);
    const errorKeys = Object.keys(err.errors);
    let message = "";
    errorKeys.forEach((key) => (message += err.errors[key].message +","));
    message = message.substr(0, message.length -2);
    res.status(400).json({
        message,
    });
 };

 exports.developmentErrors =(err,req,res,next) => {
    err.stack = err.stack || "";
    const errorDetails={
        message:err.mesage,
        status:err.status,
        stack:err.stack,
    };
    res.status(err.status || 500).json(errorDetails);
 };

 exports. productionErrors = (err,req,res,next) => {
    res.status(err.status || 500).json({
        error:"Internal Server Error",

    });
};

exports.notFound = (req,res,next) => {
    res.status(404).json({
        message:"Route not found,"
    });
};
 


