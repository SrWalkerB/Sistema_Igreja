import jwt from "jsonwebtoken";

interface IGeneratedToken{
    id: number,
    email: string,
    cargo: string,
    id_congregacao: number
}

class GeneretedToken{

    gerarTokens(data: IGeneratedToken) {
    
        return jwt.sign({ 
            id: data.id, 
            email: data.email, 
            cargo: data.cargo, 
            id_congregacao: data.id_congregacao
        }
        ,process.env.KEY!, { expiresIn: "60m" })
    }
    
    verificarToken(token:string): string| any{
    
        const result = jwt.verify(token, process.env.KEY!, (err, decoded) => {
        
            if(err) return "Token Invalido"

            return decoded;
        });

        return result;
    }
}

export default new GeneretedToken;