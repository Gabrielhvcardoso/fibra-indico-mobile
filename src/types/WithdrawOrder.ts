export interface WithdrawOrder {
  withdrawOrderId: number,
  fromUserToken: number,
  amount: number,
  status: string,
  createdAt: string,
  method: string
}
