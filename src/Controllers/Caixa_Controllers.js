const caixa_Data = require("../Data/caixa_Data");
const { VerificarToken } = require("../utils/gerarTokens");


module.exports = {

    list_Caixa: async (Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const verifica_Token = VerificarToken(token);
            const user_ID_Congregacao = verifica_Token.id_congregacao;


            if(verifica_Token.err){

                return Response.status(500).json({ err: "Token Inválido" }); 
            }


            const caixa = await caixa_Data.list_caixa(user_ID_Congregacao);
            
            
            if(caixa == ""){

                return Response.status(200).json({ msg: "Nenhuma informação lançada!" })
            }

            return Response.status(200).json(caixa)


        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}