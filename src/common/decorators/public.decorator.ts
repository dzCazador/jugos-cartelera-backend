import { SetMetadata } from "@nestjs/common";
import {IS_PUBLIC_KEY} from '../../common'

/** Decorator to mark a controller method as public  */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);