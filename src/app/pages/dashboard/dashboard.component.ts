import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/shared/utils/toast-service';
import { HttpResponse } from '@angular/common/http';
import { LoadingService } from 'src/shared/utils/loading-service';
import { DanhMucService } from 'src/app/danhmuc.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent  implements OnInit {
  listData : any;
  user: any;
  REQUEST_URL = '/api/v1/user';
  totalElement: any;
  filter: any;
  constructor(
    private dmService: DanhMucService,
    private router: Router,
    private toast: ToastService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('info') as any);
    this.getData();
  }
  getData() {
    const params = {
      sort: ['id', 'desc'],
      page: 0,
      size: 999999,
      filter: this.filter?'id>0;isActive==1' + ";fullName==*" + this.filter + "*":'id>0;isActive==1',
    };
    this.loading.show();
    this.dmService.query(params, this.REQUEST_URL).subscribe(
      (res: HttpResponse<any>) => {
        if (res.body) {
          if (res.body.code === 200) {
            this.loading.hide();
            this.listData = res.body.result.content;
            this.totalElement = res.body.result.totalElements;
          } else {
            this.loading.hide();
            this.toast.error(res.body.MESSAGE);
          }
        } else {
          this.loading.hide();
          this.toast.error('Đã có lỗi xảy ra');
        }
      },
      () => {
        this.toast.error('Đã có lỗi xảy ra');
        console.error();
        this.loading.hide();
      }
    );
  }

  create() {
    this.router.navigate(['/add-user'])
  }

  edit(id: any) {
    this.router.navigate(['/edit-user/' + id])
  }

}
