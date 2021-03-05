import { Request, Response, NextFunction } from "express";
import gerarTokens from "../../utils/gerarTokens";


export default {

    Autorizacao: (request: Request, response: Response, next: NextFunction) => {
    
        const token = request.header("Token");
        const result = gerarTokens.verificarToken(token!);
            
        if(result == "Token Invalido") return response.status(401).json();
        
        next();
        
    }
}
