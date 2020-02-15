const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended:false   }))
app.use(bodyParser.json());

const membros = [];

app.get("/",function(req, res){
    var nome = req.params.nome;
    return res.json({mensagem: "Bodia"});
});


//ADICIONA UM MEMBRO
app.post("/explorers", function(req, res, next){
    const {id} = req.body;
    const {name} = req.body;

    const membro={
        id,
        name,
        stacks: []
    };
    membros.push(membro);
    return res.json(membros)
});

//EXIBE OS MEMBROS
app.get("/explorers", function(req, res){
    if(membros.length > 0){
        return res.json(membros);
    }else{
        return res.json({mensagem: "Nenhum membro inserido ainda"});
    }
});

//COLOCANDO STACKS
app.post("/explorers/:id/stacks", function(req, res){
    const { id } = req.params;
    const { name } = req.body;

    const membro = membros.find(membro => membro.id == id);
    if(membro){
        membro.stacks.push(name);
        return res.json(membro);
    }else{
        return res.json({mensagem: "Não há nenhum membro com o id escolhido"});
    }

});

//EDITANDO MEMBRO
app.put("/explorers/:id", function(req, res){
    const { id } = req.params;
    const { name } = req.body;

    const membro = membros.find(membro => membro.id == id);
    if(membro){
        membro.name = name;
        return res.json(membro);
    }else{
        return res.json({mensagem: "Não há nenhum membro com o id escolhido"});
    }
});

//DELETANDO MEMBRO
app.delete("/explorers/:id", function(req, res){
    const { id } = req.params;
    const membro = membros.find(membro => membro.id == id);
    if(membro){
        membros.splice(membros.indexOf(membro), 1);
        return res.json({mensagem: "Membro deletado com sucesso"});
    }else{
        return res.json({mensagem: "Não há nenhum membro com o id escolhido"});
}
});

//SERVER
app.listen(3000,function(erro){
    if(erro){
        console.log("Ocorreu um erro");
    }else{
        console.log("Servidor rodando");
    }
});