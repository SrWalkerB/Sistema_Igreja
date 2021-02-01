const { request } = require("express");
const moment = require("moment");
const caixa_Data = require("../Data/caixa_Data");
const { VerificarToken } = require("../utils/gerarTokens");


module.exports = {

    list_Caixa: async (Request, Response) => {

        try {
            

            const token = Request.header("Token");
            const verifica_Token = VerificarToken(token);
            const user_ID_Congregacao = verifica_Token.id_congregacao;

            const caixa = await caixa_Data.list_caixa(user_ID_Congregacao);
            let data = [];


            caixa.map(result => {

                moment.locale("pt-br");


                const data_formtada = moment(result.data).format("LL")

                return data.push({ 
                    id_congregacao: result.id_congregacao,
                    dizimos: result.dizimos,
                    doacoes: result.doacoes,
                    ofertas: result.ofertas,
                    data: data_formtada
                 })
            })

            
            if(caixa == ""){

                return Response.status(200).json({ msg: "Nenhuma informação lançada!" })
            }

            return Response.status(200).json(data)


        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    },

    lancamento_Caixa: async (Request, Response) => {

        try {
            
            const token = Request.header("Token");
            const verifica_Token = VerificarToken(token);


            const { dizimos, doacoes, ofertas } = Request.body;


            const lancar_caixa = await caixa_Data.create_Lancamento_Caixa(verifica_Token.id_congregacao, dizimos, ofertas, doacoes);


            if(lancar_caixa <= -1){

                return Response.status(201).json({ err: "Ocorreu um erro, tente mais tarde." });
            }


            return Response.status(201).json({ msg: "Lançado!" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ err: error });
        }
    }
}