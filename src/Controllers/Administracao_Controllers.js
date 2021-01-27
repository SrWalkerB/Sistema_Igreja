const Knex_Database = require("../Database/Config/Knex_Config");


module.exports = {

    list_congregacoes: async (Request, Response) => {

        try {
            
            const congregacoes = await Knex_Database("tb_congregacoes")
            .join("tb_caixa")
            .join("tb_membros")
            
            if(congregacoes <= 0){

                return Response.status(200).json({ msg: "Nenhuma Congregação cadastrada" })
            }

            return Response.status(200).json(congregacoes)

        } catch (error) {
            
            console.log(error);
            return Response.status(200).json({ msg: error });
        }
    }
}