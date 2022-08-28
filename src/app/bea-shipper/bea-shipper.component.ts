import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/helpers/services/shared.service';

@Component({
  selector: 'app-bea-shipper',
  templateUrl: './bea-shipper.component.html',
  styleUrls: ['./bea-shipper.component.scss']
})
export class BeaShipperComponent implements OnInit {

  constructor(private http:HttpClient, private shared: SharedService, private location: Location) { }
  name:string="";
  arabicName:string="";
  officePhone:string="";
  responseMessage:any;
  ngOnInit(): void {
  }
  createRequest()
  {
    let body={name:this.name,arabicName:this.arabicName,officePhone:this.officePhone}
    this.http.post('http://localhost:5092/api/Shipper/IamShipper',body).subscribe(
      data=>{
        this. responseMessage=data;
        console.log(this.responseMessage);
        let msg = this.shared.textDirection == 'ltr' ? "Your Request have been sent, it will review later ." :
        "تم ارسال طلبك و سيتم مراجعته لاحقاً";
      this.shared.showSnackBar(msg, 5000, 'successSnackBar');
      this.location.back();
      }
    )
  }

}
