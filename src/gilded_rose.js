export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const isAgedBrie = item => {
  return item.name === 'Aged Brie';
};

const isConcertTicket = item => {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
};

const isSulfuras = item => {
  return item.name === 'Sulfuras, Hand of Ragnaros';
};

const isExpired = item => {
  return item.sellIn < 0;
};

const increaseQuality = item => {
  if (item.quality < 50) {
    item.quality++;
  }
};

const decreaseQuality = item => {
  if (item.quality > 0) {
    item.quality--;
  }
};

const decreaseSellIn = item => {
  item.sellIn--;
};

const updateSulfuras = () => {
  return;
};

const updateConcertTicket = item => {
  decreaseSellIn(item);

  if (isExpired(item)) {
    item.quality = 0;
    return;
  }
  increaseQuality(item);

  if (item.sellIn < 10) {
    increaseQuality(item);
  }
};

const updateAgedBrie = item => {
  decreaseSellIn(item);
  increaseQuality(item);

  if (isExpired(item)) {
    increaseQuality(item);
  }
};

const commonUpdate = item => {
  decreaseSellIn(item);
  decreaseQuality(item);

  if (isExpired(item)) {
    decreaseQuality(item);
  }
};

const updateItem = item => {
  if (isSulfuras(item)) {
    return updateSulfuras;
  }

  if (isAgedBrie(item)) {
    return updateAgedBrie;
  }

  if (isConcertTicket(item)) {
    return updateConcertTicket;
  }

  return commonUpdate;
};

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {
      const update = updateItem(item);
      update(item);
    });
  }
}
