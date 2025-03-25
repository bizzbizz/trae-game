package types

import "github.com/google/uuid"

type Icon string

// economy
type BusinessId string
type Tag string
type ResourceID string
type ProductionId string
type ProductionFlowId string

// effect
type UserSkillID string
type UserStatID string
type TerritoryStatID string
type ZoneStatID string

// society
type HobbyId string

// user
type UserID uuid.UUID
type UserName string
type UserEconomyResources map[string]float64
type UserEconomyFlows []string
