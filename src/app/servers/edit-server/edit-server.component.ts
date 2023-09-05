import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from 'src/app/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeSave = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // การทำงานในนี้จะเกิดเมื่อมีการสร้าง Component ใหม่ การใช้ snapshot จึงไม่สามารถใช้ได้ เพราะ ต่อให้ query ใน params เปลี่ยนข้อมูลจะไม่เปลี่ยนแปลงตาม
    //  เนื่องจาก Angular จะไม่สร้าง Component นี้ซ้ำที่มีอยู่
    console.log('QueryParams', this.route.snapshot.queryParams);
    console.log('Fragment', this.route.snapshot.fragment);

    // ต้องใช้แบบนี้
    this.route.queryParams.subscribe((queryParam: Params) => {
      this.allowEdit = queryParam['allowEdit'] === '1' ? true : false;
    });
    this.route.fragment.subscribe((fragment) => {});

    this.server = this.serversService.getServer(
      +this.route.snapshot.params['id']
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changeSave = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // logic ในการบอกว่าจะให้ออกจาก route นี้หรือไม่ ซึ่ง function นี้จะทำงานทุกครั้งที่ canDeactivateGuard ถูก router-outer ตรวจสอบ
    if (!this.allowEdit) {
      return true;
    }
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changeSave
    ) {
      return confirm('Do you discard this changes?');
    } else {
      return true;
    }
  }
}
