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
  item.quality++;
};

const decreaseQuality = item => {
  item.quality--;
};

const updateItem = item => {
  if (!isAgedBrie(item) && !isConcertTicket(item)) {
    if (item.quality > 0) {
      if (!isSulfuras(item)) {
        decreaseQuality(item);
      }
    }
  } else {
    if (item.quality < 50) {
      inceraseQuality(item);
      if (isConcertTicket(item)) {
        if (item.sellIn < 11) {
          if (item.quality < 50) {
            inceraseQuality(item);
          }
        }
        if (item.sellIn < 6) {
          if (item.quality < 50) {
            inceraseQuality(item);
          }
        }
      }
    }
  }
  if (!isSulfuras(item)) {
    item.sellIn = item.sellIn - 1;
  }
  if (item.sellIn < 0) {
    if (!isAgedBrie(item)) {
      if (!isConcertTicket(item)) {
        if (item.quality > 0) {
          if (!isSulfuras(item)) {
            decreaseQuality(item);
          }
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
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
