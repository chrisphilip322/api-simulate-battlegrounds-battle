/* eslint-disable @typescript-eslint/no-use-before-define */
import { AllCardsService, CardIds } from '@firestone-hs/reference-data';
import { BoardEntity } from './board-entity';

const CLEAVE_IDS = [
	'LOOT_078', // Cave Hydra
	'GVG_113', // Foe Reaper 4000
];
const MEGA_WINDFURY_IDS = [CardIds.NonCollectible.Neutral.ZappSlywickTavernBrawl];

export const buildSingleBoardEntity = (cardId: string, allCards: AllCardsService, entityId = 1): BoardEntity => {
	const card = allCards.getCard(cardId);
	const megaWindfury = MEGA_WINDFURY_IDS.indexOf(cardId) !== -1;
	return {
		attack: card.attack,
		attacksPerformed: 0,
		cardId: cardId,
		divineShield: card.mechanics && card.mechanics.indexOf('DIVINE_SHIELD') !== -1,
		entityId: entityId,
		health: card.health,
		taunt: card.mechanics && card.mechanics.indexOf('TAUNT') !== -1,
		reborn: card.mechanics && card.mechanics.indexOf('REBORN') !== -1,
		cleave: CLEAVE_IDS.indexOf(cardId) !== -1,
		poisonous: card.mechanics && card.mechanics.indexOf('POISONOUS') !== -1,
		windfury: !megaWindfury && card.mechanics && card.mechanics.indexOf('WINDFURY') !== -1,
		megaWindfury: megaWindfury,
		enchantments: [],
	} as BoardEntity;
};

export const stringifySimple = (board: readonly BoardEntity[]): string => {
	return '[' + board.map(entity => stringifySimpleCard(entity)).join(', ') + ']';
};

export const stringifySimpleCard = (entity: BoardEntity): string => {
	return entity
		? `${entity.attack}/${entity.health}/${entity.entityId}/${entity.divineShield}/${entity.attacksPerformed || 0}`
		: null;
};
