import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
// Resolve<{รายการ/field ข้อมูลที่จะได้รับที่นี่}> เราต้องการให้ Service นี้จะทำการ load ข้อมูลที่เราต้องการก่อนจะเข้า path จริงทุกครั้ง (resolve เหมาะกับ async)
export class ServerResolverService implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  // Service นี้จะทำงานจริงทุกครั้งที่เราเข้า route server นี้ ดังนั้น snapShot จะเหมาะกับการทำงานอันนี้
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}
