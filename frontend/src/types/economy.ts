import { UserSkillEffect } from './effect';

export interface Economy {
  Businesses: Business[];
  Resources: Resource[];
}

export interface Business {
  BusinessId: string;
  Icon: string;
  Description: string;
  CanBeHobby: boolean;
  Requirements: ProductionFlowBatchInput[];
  Productions: Production[];
}

export interface ResourceCategory {
  CategoryId: string;
  Icon: string;
}

export interface Resource {
  ResourceId: string;
  Icon: string;
  CategoryId: string;
}

export interface Production {
  ProductionId: string;
  Icon: string;
  UserSkillEffects: UserSkillEffect[];
  Flows: ProductionFlow[];
}

export interface ProductionFlow {
  FlowId: string;
  MaxPeople: number;
  Input: ProductionFlowBatchInput[];
  Catalysts: ProductionFlowBatchCatalyst[];
  Output: ProductionFlowBatch[];
}

export interface ProductionFlowBatch {
  BatchId: string;
  AmountPerTurn: number;
}

export interface ProductionFlowBatchInput extends ProductionFlowBatch {
  IsConsumed: boolean;
}

export interface ProductionFlowBatchCatalyst extends ProductionFlowBatchInput {
  OutputMultiplier: Record<string, number>;
  OutputAdd: Record<string, number>;
  InputMultiplier: Record<string, number>;
  InputSubtract: Record<string, number>;
}
