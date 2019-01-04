import { Shop, Item } from '../gilded_rose';

const createTestShop = () => {
  const items = [];

  items.push(new Item('+5 Dexterity Vest', 10, 20));
  items.push(new Item('Aged Brie', 2, 0));
  items.push(new Item('Elixir of the Mongoose', 5, 7));
  items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
  items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));

  return new Shop(items);
};

const cloneDeep = function(data) {
  return JSON.parse(JSON.stringify(data));
};

describe('Gilded Rose', () => {
  it('should return proper snapshots', () => {
    const shop = createTestShop();
    const days = 2;
    const actual = [];
    for (let i = 0; i < days; i++) {
      actual.push(cloneDeep(shop.items));
      shop.updateQuality();
    }
    expect(actual).toMatchSnapshot();
  });

  it('should return proper item properties of created item', () => {
    const gildedRose = new Item('Aged Brie', 10, 20);
    expect(gildedRose.name).toEqual('Aged Brie');
    expect(gildedRose.sellIn).toEqual(10);
    expect(gildedRose.quality).toEqual(20);
  });

  it("should return proper item name of shop's item", () => {
    const gildedRose = new Shop([new Item('Aged Brie', 0, 0)]);
    expect(gildedRose.items[0].name).toEqual('Aged Brie');
  });

  it('should return the item name from test shop', () => {
    const gildedRose = createTestShop();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].name).toEqual('+5 Dexterity Vest');
  });

  it('should return the item name from test shop', () => {
    const gildedRose = createTestShop();
    gildedRose.updateQuality();
    expect(gildedRose.items[5].name).toEqual(
      'Backstage passes to a TAFKAL80ETC concert',
    );
  });

  it('should update properly the sellIn property', () => {
    const gildedRose = createTestShop();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toEqual(9);
  });

  it('should update properly the quality property', () => {
    const gildedRose = createTestShop();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(19);
  });

  it('should update properly the quality property', () => {
    const gildedRose = createTestShop();
    gildedRose.updateQuality();
    console.log(gildedRose.items);
    expect(gildedRose.items[7].quality).toEqual(50);
  });

  it('should update properly the quality property after 2 updates', () => {
    const gildedRose = createTestShop();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[3].quality).toEqual(80);
  });

  it('should update properly the quality property after 3 updates', () => {
    const gildedRose = createTestShop();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[4].quality).toEqual(80);
  });
});
