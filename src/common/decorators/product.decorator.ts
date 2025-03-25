import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Product = createParamDecorator(
    //Desde el Contexto de la app (ctx)
    (data, ctx: ExecutionContext) => {
        //Obtener el request
        //y desde alli el usuarioque generamos desde JWTPassport
    const request = ctx.switchToHttp().getRequest();
    return request.product;
});