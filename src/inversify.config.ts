import { Container } from "inversify";
import TYPES from "./types";
import { AuthService, AuthServiceImpl } from "./service/AuthService";
import { UserRepository, UserRepositoryImpl, } from "./repository/UserRepository";
import { ProgramRepository, ProgramRepositoryImpl } from "./repository/ProgramRepository";
import { ProgramStepRepository, ProgramStepRepositoryImpl,} from "./repository/ProgramStepRepository";
import { RegistrableController } from "./controller/RegisterableController";
import { AuthController } from "./controller/AuthController";
import { TransactionController } from "./controller/TransactionController";
import { UserController } from "./controller/UserController";
import { OrderController } from "./controller/OrderController";
import { PaymentMethodController } from "./controller/PaymentMethodController";
import { ProgramController } from "./controller/ProgramController";
import { ProgramStepController } from "./controller/ProgramStepController";
import { UserService, UserServiceImpl } from "./service/UserService";
import {TransactionService, TransactionServiceImpl } from "./service/TransactionService";
import { ProgramService, ProgramServiceImpl } from "./service/ProgramService";
import {ProgramStepService,ProgramStepServiceImpl } from "./service/ProgramStepService";
import {PaymentMethodService, PaymentMethodServiceImpl} from "./service/PaymentMethodService";
import {OrderService, OrderServiceImpl } from "./service/OrderService";
import {PaymentMethodRepository, PaymentMethodRepositoryImpl,} from "./repository/PaymentMethodRepository";
import {TransactionRepository, TransactionRepositoryImpl,} from "./repository/TransactionRepository";
import {OrderRepository, OrderRepositoryImpl,} from "./repository/OrderRepository";
import {UserPaymentMethodsRepository, UserPaymentMethodsRepositoryImpl} from "./repository/UserPaymentMethodsRepository";
const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<RegistrableController>(TYPES.Controller).to(AuthController);
container.bind<RegistrableController>(TYPES.Controller).to(ProgramController);
container.bind<RegistrableController>(TYPES.Controller).to(OrderController);
container.bind<RegistrableController>(TYPES.Controller).to(TransactionController);
container.bind<RegistrableController>(TYPES.Controller).to(PaymentMethodController);
container.bind<RegistrableController>(TYPES.Controller).to(ProgramStepController);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<TransactionRepository>(TYPES.TransactionRepository).to(TransactionRepositoryImpl);
container.bind<ProgramRepository>(TYPES.ProgramRepository).to(ProgramRepositoryImpl);
container.bind<ProgramStepRepository>(TYPES.ProgramStepRepository).to(ProgramStepRepositoryImpl);
container.bind<UserPaymentMethodsRepository>(TYPES.UserPaymentMethodsRepository).to(UserPaymentMethodsRepositoryImpl);
container.bind<PaymentMethodRepository>(TYPES.PaymentMethodRepository).to(PaymentMethodRepositoryImpl);
container.bind<TransactionService>(TYPES.TransactionService).to(TransactionServiceImpl);
container.bind<ProgramStepService>(TYPES.ProgramStepService).to(ProgramStepServiceImpl);
container.bind<PaymentMethodService>(TYPES.PaymentMethodService).to(PaymentMethodServiceImpl);
container.bind<OrderService>(TYPES.OrderService).to(OrderServiceImpl);
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);
container.bind<OrderRepository>(TYPES.OrderRepository).to(OrderRepositoryImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<ProgramService>(TYPES.ProgramService).to(ProgramServiceImpl);

export default container;
