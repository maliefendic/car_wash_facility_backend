export interface OrderDTO {
  id?: number;
  programStepsId?: number;
  orderId?: number;
  userId?: number;
  total?: number;
  status?: string;
  discount?: number;
}