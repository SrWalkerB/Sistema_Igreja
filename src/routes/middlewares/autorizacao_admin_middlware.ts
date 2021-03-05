
import { Request, Response, NextFunction } from "express";
import gerarTokens from "../../utils/gerarTokens";


export default {

    Autorizacao_ADMIN: (request: Request, response: Response, next: NextFunction) => {
    
        const token = request.header("Token");
        const result = gerarTokens.verificarToken(token!);
            
        if(result == "Token Invalido") return response.status(401).json();
        
        const { cargo } = result;

        if(cargo != "ADM") return response.status(401).json();

        next();
    }
}
