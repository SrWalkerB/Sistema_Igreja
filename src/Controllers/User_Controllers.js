const congregacao_Data = require("../Data/congregacao_Data");
const membros_Data = require("../Data/membros_Data");
const { VerificarToken } = require("../utils/gerarTokens");


module.exports = {


    list_congregacao: async (Request, Response) => {


        try {

            //Verificando Token

            const token = Request.header("Token");
            const verficar_token = VerificarToken(token);


            if(verficar_token.err){

                return Response.status(401).json({ err: verficar_token.err })

            }

            const seacher_congregacao = await congregacao_Data.list_congregacao_ID(verficar_token.id_congregacao);
            


            return Response.status(200).json(seacher_congregacao);
            
        } catch (error) {
            
            console.log(error);
            return Response.status(200).json({ err: error })
        }
    },

    list_membros_congregacao: async (Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const verifica_token = VerificarToken(token);


            const seacher_membros = await membros_Data.list_membros_Congregacao(verifica_token.id_congregacao);

            if(seacher_membros == ""){
             
                return Response.status(200).json({ msg: "Nenhum membro cadastrado" });
            }


            return Response.status(200).json(seacher_membros);

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}