import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ipartner } from 'src/helpers/interfaces/iPartner2';
import { SharedService } from 'src/helpers/services/shared.service';

@Component({
  selector: 'app-bea-partner',
  templateUrl: './bea-partner.component.html',
  styleUrls: ['./bea-partner.component.scss']
})
export class BeaPartnerComponent implements OnInit {
  partner: Ipartner = { name: "", numberOfBranches: 0 };
  responsedata: any;
  ResponseMessage: string = "";
  constructor(private http: HttpClient, private shared: SharedService, private location: Location) {

  }

  ngOnInit(): void {
  }
  RequestPartnership() {
    this.http.post<Ipartner>("http://localhost:5092/api/RequestTobeAPartner/BePartner", this.partner).subscribe(data => {
      this.responsedata = data;
      console.log(data);
      let msg = this.shared.textDirection == 'ltr' ? "Your Request have been sent, it will review later ." :
        "تم ارسال طلبك و سيتم مراجعته لاحقاً";
      this.shared.showSnackBar(msg, 5000, 'successSnackBar');
      this.location.back();

    });


  }

}
