const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('./uploads'));
app.use('/assets', express.static('./assets'));
const rotaUsuarios = require('./routes/rotaUsuario');
const rotaEmpresas = require('./routes/rotaEmpresa');
const rotaPatrimonio = require('./routes/rotaPatrimonio');
const rotaSetor = require('./routes/rotaSetor');
const rotaLotacao = require('./routes/rotaLotacao');
const rotaRegister = require('./routes/rotaRegister');


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
 
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
          );
        if(req.method==='OPTIONS'){
            res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
            return res.status(200).send({});
        }
        next();
    })

app.use("/usuario",rotaUsuarios);
app.use("/empresa",rotaEmpresas);
app.use("/patrimonio",rotaPatrimonio);
app.use("/setor",rotaSetor);
app.use("/lotacao",rotaLotacao);
app.use("/register",rotaRegister);


app.use((req,res,next)=>{
      const erro = new Error("Não encontrado!");
      erro.status(404);
      next(erro);
});
app.use((error,req,res,next)=>{
        res.status(error.status || 500);
        return res.json({
            erro:{
                 mensagem:error.message
            }
        })
})

module.exports = app