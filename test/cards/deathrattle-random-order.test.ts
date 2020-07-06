import { AllCardsService, CardIds } from '@firestone-hs/reference-data';
import { BgsBattleInfo } from '../../src/bgs-battle-info';
import { BgsPlayerEntity } from '../../src/bgs-player-entity';
import { BoardEntity } from '../../src/board-entity';
import { CardsData } from '../../src/cards/cards-data';
import { simulateBattle } from '../../src/simulate-bgs-battle';
import { Simulator } from '../../src/simulation/simulator';
import { buildSingleBoardEntity } from '../../src/utils';
import cardsJson from '../cards.json';

describe('Deathrattle random order', () => {
	test('First board to trigger deathrattles is chosen randomly', async () => {
		const cards = buildCardsService();
		await cards.initializeCardsDb();
		const spawns = new CardsData(cards);
		const simulator = new Simulator(cards, spawns);
		const sharedState = simulator['sharedState'];

		const playerBoard: BoardEntity[] = [
			{
				...buildSingleBoardEntity(
					CardIds.Collectible.Neutral.KaboomBot,
					cards,
					true,
					sharedState.currentEntityId++,
				),
				attack: 4,
				health: 2,
			},
			{
				...buildSingleBoardEntity(
					CardIds.Collectible.Hunter.Alleycat,
					cards,
					true,
					sharedState.currentEntityId++,
				),
			},
			{
				...buildSingleBoardEntity(
					CardIds.Collectible.Hunter.MetaltoothLeaper,
					cards,
					true,
					sharedState.currentEntityId++,
				),
			},
		];
		const playerEntity: BgsPlayerEntity = { tavernTier: 1 } as BgsPlayerEntity;
		const opponentBoard: BoardEntity[] = [
			{
				...buildSingleBoardEntity(
					CardIds.NonCollectible.Neutral.StewardOfTime,
					cards,
					false,
					sharedState.currentEntityId++,
				),
			},
			{
				...buildSingleBoardEntity(
					CardIds.NonCollectible.Neutral.Imprisoner,
					cards,
					false,
					sharedState.currentEntityId++,
				),
			},
		];
		const opponentEntity: BgsPlayerEntity = { tavernTier: 1 } as BgsPlayerEntity;

		const battleInput: BgsBattleInfo = {
			playerBoard: {
				board: playerBoard,
				player: playerEntity,
			},
			opponentBoard: {
				board: opponentBoard,
				player: opponentEntity,
			},
			options: {
				numberOfSimulations: 10000,
				maxAcceptableDuration: 2000,
			},
		};
		// sharedState.debug = true;
		const result = simulateBattle(battleInput, cards, spawns);

		expect(result).not.toBeNull();
		expect(result.wonPercent).toBeGreaterThan(74);
		expect(result.wonPercent).toBeLessThan(76);
	});
});

function buildCardsService() {
	const service = new AllCardsService();
	service['allCards'] = [...(cardsJson as any[])];
	return service;
}
