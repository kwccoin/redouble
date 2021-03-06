import {Bid, BidSuit, BidType} from '../bid';

describe("Bid", () => {

	beforeEach(() => {});

	describe("compare", () => {
		it("recognises equality", () => {
			let bid1 = { type: BidType.Call, level: 3, suit: BidSuit.Hearts };
			let bid2 = { type: BidType.Call, level: 3, suit: BidSuit.Hearts };
			expect(Bid.compare(bid1, bid2)).to.equal(0);
			expect(Bid.compare(bid2, bid1)).to.equal(0);

			bid1 = { type: BidType.Double };
			bid2 = { type: BidType.Double };
			expect(Bid.compare(bid1, bid2)).to.equal(0);
			expect(Bid.compare(bid2, bid1)).to.equal(0);
		});

		it("obeys order of precedence of suits", () => {
			let bid1 = { type: BidType.Call, level: 1, suit: BidSuit.Clubs };
			let bid2 = { type: BidType.Call, level: 1, suit: BidSuit.Diamonds };
			expect(Bid.compare(bid1, bid2)).to.be.at.most(0);
			expect(Bid.compare(bid2, bid1)).to.be.above(0);

			bid1.suit = BidSuit.Diamonds;
			bid2.suit = BidSuit.Hearts;
			expect(Bid.compare(bid1, bid2)).to.be.at.most(0);
			expect(Bid.compare(bid2, bid1)).to.be.at.least(0);

			bid1.suit = BidSuit.Hearts;
			bid2.suit = BidSuit.Spades;
			expect(Bid.compare(bid1, bid2)).to.be.at.most(0);
			expect(Bid.compare(bid2, bid1)).to.be.at.least(0);

			bid1.suit = BidSuit.Spades;
			bid2.suit = BidSuit.NoTrumps;
			expect(Bid.compare(bid1, bid2)).to.be.at.most(0);
			expect(Bid.compare(bid2, bid1)).to.be.at.least(0);
		});
	});

	describe("create", () => {
		it("creates bids correctly", () => {
			let bid = Bid.create("1C");
			expect(bid.suit).to.equal(BidSuit.Clubs);
			expect(bid.level).to.equal(1);

			bid = Bid.create("4S");
			expect(bid.suit).to.equal(BidSuit.Spades);
			expect(bid.level).to.equal(4);

			bid = Bid.create("7NT");
			expect(bid.suit).to.equal(BidSuit.NoTrumps);
			expect(bid.level).to.equal(7);

			bid = Bid.create("2N");
			expect(bid.suit).to.equal(BidSuit.NoTrumps);
			expect(bid.level).to.equal(2);
		});
	});

	describe("createAll", () => {
		it("creates lists of bids correctly from argument list", () => {
			let bids = Bid.createAll("1C", "double", "1S");
			expect(bids.length).to.equal(3);
			expect(bids[0].suit).to.equal(BidSuit.Clubs);
			expect(bids[0].level).to.equal(1);
			expect(bids[2].suit).to.equal(BidSuit.Spades);
			expect(bids[2].level).to.equal(1);
		});

		it("creates lists of bids correctly from array argument", () => {
			let bids = Bid.createAll(["1C", "double", "1S"]);
			expect(bids.length).to.equal(3);
			expect(bids[0].suit).to.equal(BidSuit.Clubs);
			expect(bids[0].level).to.equal(1);
			expect(bids[2].suit).to.equal(BidSuit.Spades);
			expect(bids[2].level).to.equal(1);
		});

	});

});
