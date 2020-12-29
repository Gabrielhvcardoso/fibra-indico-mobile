export interface Withdraw {
  withdrawOrderId: number,
  fromUserToken: number,
  amount: number,
  status: string;
  createdAt: string
}

export const isWithdraw = (toBeDetermined: any | Withdraw): toBeDetermined is Withdraw => {
  if ((toBeDetermined as Withdraw).withdrawOrderId) return true;
  return false;
};
