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

const inceraseQuality = item => {
  if (item.quality < 50) {
    item.quality++;
  }
};

const decreaseQuality = item => {
  if (item.quality > 0) {
    item.quality--;
  }
};

const updateItem = item => {
  if (isSulfuras(item)) {
    return;
  }

  item.sellIn = item.sellIn - 1;

  if (!isAgedBrie(item) && !isConcertTicket(item)) {
    decreaseQuality(item);
  } else {
    inceraseQuality(item);
    if (isConcertTicket(item)) {
      if (item.sellIn < 11) {
        inceraseQuality(item);
      }
    }
  }

  if (item.sellIn < 0) {
    if (!isAgedBrie(item)) {
      if (!isConcertTicket(item)) {
        decreaseQuality(item);
      } else {
        inceraseQuality(item);
      }
    }
  }
};

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(updateItem);
  }
}
