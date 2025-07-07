// 集中导出所有 action/service，便于统一管理和类型提示
import * as productAction from "./product.action";
import * as productServiceImpl from "./product.service";
import * as profileAction from "./profile.action";
import * as profileServiceImpl from "./profile.service";
import * as userAction from "./user.action";
import * as useAuth from "./user.auth";
import * as userServiceImpl from "./user.service";

import type { ProductService } from "./product.service";
import type { ProfileService } from "./profile.service";
import type { UserService } from "./user.service";

// 通过类型断言让实现和接口强关联，便于类型提示和 IDE 智能感知
export const productService: ProductService =
  productServiceImpl as unknown as ProductService;
export const profileService: ProfileService =
  profileServiceImpl as unknown as ProfileService;
export const userService: UserService =
  userServiceImpl as unknown as UserService;

export { productAction, profileAction, userAction, useAuth };
