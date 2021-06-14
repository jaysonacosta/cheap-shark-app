import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CheapSharkDealsService } from 'src/app/services/cheap-shark-deals.service';
import { CheapSharkStoresService } from 'src/app/services/cheap-shark-stores.service';
import { environment } from 'src/environments/environment';
import { Deal, Store } from '../home/home.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  sidebarOpened = false;

  cheapSharkLink = environment.cheapSharkLink;
  cheapSharkImageLink = environment.cheapSharkImageLink;

  stores: Store[] = [];
  sortCriteria = [
    'Deal Rating',
    'Title',
    'Savings',
    'Price',
    'Metacritic',
    'Reviews',
    'Release',
    'Store',
    'recent',
  ];

  searchCriteria = {
    store: '',
    filter: '',
    minPrice: '',
    maxPrice: '',
    onSale: false,
    gameTitle: '',
  };

  dealsFound: Deal[] = [];

  constructor(
    private cheapSharkStoresService: CheapSharkStoresService,
    private cheapSharkDealsService: CheapSharkDealsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getStores();
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

  async submitSearch(): Promise<void> {
    let params = new HttpParams();
    if (this.searchCriteria.store) {
      params = params.append('storeID', this.searchCriteria.store);
    }
    if (this.searchCriteria.filter) {
      params = params.append('sortBy', this.searchCriteria.filter);
    }
    if (this.searchCriteria.minPrice) {
      params = params.append(
        'lowerPrice',
        String(this.searchCriteria.minPrice)
      );
    }
    if (this.searchCriteria.maxPrice) {
      params = params.append(
        'upperPrice',
        String(this.searchCriteria.maxPrice)
      );
    }
    if (this.searchCriteria.onSale) {
      params = params.append('onSale', String(this.searchCriteria.onSale));
    }
    if (this.searchCriteria.gameTitle) {
      params = params.append('title', this.searchCriteria.gameTitle);
    }
    const data = await this.cheapSharkDealsService.getDeals(params);
    this.getDeals(data);
    this.getDealStore();
    console.log(this.dealsFound);
  }

  getDeals(data: any[]): void {
    this.dealsFound = [];
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
        this.dealsFound.push(deal);
      }
    }
  }

  getDealStore(): void {
    for (const deal of this.dealsFound) {
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

  toggleSidebar(event: boolean): void {
    this.sidebarOpened = event;
  }
}
