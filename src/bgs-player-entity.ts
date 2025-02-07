export interface BgsPlayerEntity {
	readonly entityId: number;
	readonly cardId: string;
	readonly nonGhostCardId?: string;
	readonly hpLeft: number;
	readonly tavernTier: number;
	readonly heroPowerId: string;
	readonly heroPowerUsed: boolean;
	readonly heroPowerInfo?: number;
	cardsInHand?: number;
	avengeCurrent?: number;
	avengeDefault?: number;

	deadEyeDamageDone?: number;
}
