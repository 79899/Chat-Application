const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const errorHandulers = require('./handlers/errorhandlers');
app.use(errorHandulers.notFound);
app.use(errorHandulers.mongoseErrors);
if(process.env.ENV === "DEVELOPMENT"){
    app.use(errorHandulers.developmentErrors)
} else {
    app.use(errorHandulers.productionErrors);
}
module.exports=app;