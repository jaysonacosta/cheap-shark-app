import { Component, OnInit } from '@angular/core';
import { CheapSharkDealsService } from 'src/app/services/cheap-shark-deals.service';
import { CheapSharkStoresService } from 'src/app/services/cheap-shark-stores.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sidebarOpened = false;

  onSale: Deal[] = [];

  stores: Store[] = [];

  cheapSharkLink = environment.cheapSharkLink;
  cheapSharkImageLink = environment.cheapSharkImageLink;

  constructor(
    private cheapSharkDealsService: CheapSharkDealsService,
    private cheapSharkStoresService: CheapSharkStoresService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getStores();
    await this.getSales();
    this.getDealStore();
    console.log(this.onSale);
    console.log(this.stores);
  }

  async getSales(): Promise<void> {
    const data = await this.cheapSharkDealsService.getSales();
    for (const entry in data) {
      if (entry) {
        const deal: Deal = {
          dealId: data[entry]['dealID'],
          dealRating: data[entry]['dealRating'],
          isOnSale: Boolean(data[entry]['isOnSale']),
          salePrice: data[entry]['salePrice'],
          normalPrice: data[entry]['normalPrice'],
          savings: Math.floor(data[entry]['savings']),
          thumbnail: data[entry]['thumb'],
          store: {
            storeName: data[entry]['storeID'],
          },
          title: data[entry]['title'],
        };
        this.onSale.push(deal);
      }
    }
  }

  getDealStore(): void {
    for (const deal of this.onSale) {
      for (const store of this.stores) {
        if (deal.store.storeName === store.storeId) {
          deal.store.storeName = store.storeName;
          deal.store.banner = this.cheapSharkImageLink + store.images.banner;
          deal.store.logo = this.cheapSharkImageLink + store.images.logo;
        } else {
          continue;
        }
      }
    }
  }

  async getStores(): Promise<void> {
    const data = await this.cheapSharkStoresService.getStores();
    for (const entry in data) {
      if (entry) {
        const store: Store = {
          storeId: data[entry]['storeID'],
          storeName: data[entry]['storeName'],
          isActive: Boolean(data[entry]['isActive']),
          images: {
            banner: data[entry]['images']['banner'],
            logo: data[entry]['images']['logo'],
          },
        };
        this.stores.push(store);
      }
    }
  }

  toggleSidebar(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }
}

export interface Deal {
  dealId: string;
  dealRating: string;
  isOnSale: boolean;
  salePrice: string;
  normalPrice: string;
  savings: number;
  thumbnail: string;
  store: {
    storeName: string;
    banner?: string;
    logo?: string;
  };
  title: string;
}

export interface Store {
  storeId: string;
  storeName: string;
  isActive: boolean;
  images: {
    banner: string;
    logo: string;
  };
}
