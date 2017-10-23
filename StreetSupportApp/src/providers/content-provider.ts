import {Injectable} from "@angular/core";
import {ApiProvider} from "./api-provider";
import {LocationProvider} from "./location-provider";


@Injectable()
export class ContentProvider {

  cities: any;
  aFilters: any[];

  constructor(
    public api: ApiProvider,
    public locationProvider: LocationProvider) { }

  findCities(): any {
    if (this.cities !== undefined) {
      return Promise.resolve(this.cities);
    }

    return this.api.call('/v1/cities').then(cities => {
      return this.cities = cities.filter(c => c.isPublic === true);
    });
  }

  findServiceCategories(): any {
    return this.api.call('/v2/service-categories');
  }

  findStandardServices(category: string, cityId: string, useLocation: boolean): any {
    if (useLocation == true) {
      return this.findServicesByLocation('service-categories', category, 10000).then(data => {
        return {
          locationEnabled: true,
          services: data
        };
      })
      .catch(error => {
        return this.findServicesByCity('services', category, cityId, 10000).then(data => {
          return {              
            locationEnabled: false,
            services: data
          };
        });
      });
    } else {
      return this.findServicesByCity('services', category, cityId, 10000).then(data => {
        return {
          locationEnabled: false,
          services: data
        };
      });
    }
  }
  
  findAccommodationServices(category: string, cityId: string, useLocation: boolean, filters: any[]): any {
    if (useLocation == true) {
      return this.findAccommodationByLocation(filters).then(data => {
        return {
          locationEnabled: true,
          services: data
        };
      })
      .catch(error => {
        return this.findAccommodationByCity(cityId, filters).then(data => {
          return {
            locationEnabled: false,
            services: data
          };
        });
      });
    } else {
      return this.findAccommodationByCity(cityId, filters).then(data => {
        return {
          locationEnabled: false,
          services: data
        };
      });
    }
  }
    
  findAccommodationDetails(accommodationId:string) : any{
    return this.api.call(`/v1/accommodation/${accommodationId}`);
  }

  findTimetabledServices(category: string, cityId: string, useLocation: boolean): any {

    if (useLocation == true) {
      return this.locationProvider.getUserLocation().then((location: any) => {
        let url = `/v2/timetabled-service-providers/show/${category}/long/${location.longitude}/lat/${location.latitude}?range=10000`;
        return this.api.call(url).then(data => {
          return {
            locationEnabled: true,
            services: data
          };
        });
      }).catch(error => {
        return this.findServicesByCity('services-by-day', category, cityId, 10000).then(data => {
          return {
            locationEnabled: false,
            services: data
          };
        });
      });
    } else {
      return this.findServicesByCity('services-by-day', category, cityId, 10000).then(data => {
        return {
          locationEnabled: false,
          services: data
        };
      });
    }
  }

  findOrganisations(cityId: string): any {
    if (cityId === undefined || cityId === null) {
      cityId = '';
    }
    return this.api.call(`/v2/service-providers/${cityId}`);
  }

  findOrganisationBySlug(slug) {
    return this.api.call(`/v2/service-providers/show/${slug}`);
  }

  private findAccommodationByCity(cityId, aFilters) {
      let url = `/v1/accommodation/?cityid=${cityId}`;
      aFilters.forEach(function(aFilter){
          url += `&${aFilter.name}=${aFilter.value}`;
        })
      return this.api.call(url);
    }
  
  private findAccommodationByLocation(aFilters) {
    return this.locationProvider.getUserLocation().then((location: any) => {
      let url = `/v1/accommodation/?latitude=${location.latitude}&longitude=${location.longitude}`;
      aFilters.forEach(function(name,value){
        console.log([name,value]);
          url += `&${name}=${value}`;
        });
        console.log(url);
      return this.api.call(url);
    });
  }
  
  private findServicesByCity(type, category, cityId, range) {
    return this.api.call(`/v1/cities/${cityId}/${type}/${category}?range=${range}`);
  }

  private findServicesByLocation(type, category, range) {
    return this.locationProvider.getUserLocation().then((location: any) => {
      let url = `/v2/${type}/${category}/${location.latitude}/${location.longitude}?range=${range}`;
      return this.api.call(url);
    });
  }
}
