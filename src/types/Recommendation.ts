export interface Recommendation {
  recommendationId: number,
  productId: number,
  status: string,
  createdAt: string,
  client: string,
  phone1: string,
  phone2?: string
}

export const isRecommendation = (toBeDetermined: any | Recommendation): toBeDetermined is Recommendation => {
  if ((toBeDetermined as Recommendation).recommendationId) return true;
  return false;
};
