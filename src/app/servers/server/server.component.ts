import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // ใช้ reslover
    this.route.data.subscribe((data: Data) => {
      this.server = data['server']; // อ้างอิงจากชื่อ obj ที่ตั้งใน resolve ที่ path
    });

    // ใช้ params จาก path url
    // const id = parseInt(this.route.snapshot.params['id']);
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // });
  }

  onEdit() {
    // วิธีไหนก็ได้ ค่าเท่ากัน
    // this.router.navigate(['/servers', this.server.id, 'edit']);
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    }); // queryParamsHandling: 'merge' เป็นการรวม query params เก่ากับใหม่ ส่วน 'preserve' จะเก็บค่าเก่าเอาไว้
  }
}
