const Knex_Database = require("../Database/Config/Knex_Config");


module.exports = {

    create_account: async (Request, Response) => {

        try {
            
            const { name, surname, email, password, type, id_congregacao } = Request.body;


            const seacher = await Knex_Database("tb_users").where("email", email);
            

            if(seacher != 0){

                return Response.status(200).json({ msg: "Conta já cadastrada" })
            }


            const create = await Knex_Database("tb_users").insert({

                name: name,
                surname: surname,
                email: email,
                password: password,
                type: type,
                id_congregacao: id_congregacao

            }).then(resp => {

                return resp;
            })

            if(create <= 0){

                return Response.status(500).json({ msg: "Ocorreu um erro na criação da conta, tente mais tarde" });
            } 


            return Response.status(200).json({ msg: "Conta criada!" });

        } catch (error) {
            
            console.log(error);
            return Response.status(500).json({ msg: error });
        }
    }
}