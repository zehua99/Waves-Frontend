import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AlertService } from '../../service/alert';
import { GlobalService } from '../../global';
import { UserService } from '../../service/user';
import { OauthService } from '../../service/oauth';

@Component({
  selector: 'my-setting-home',
  templateUrl: './setting.my.component.html',
  styleUrls: ['./setting.my.component.scss'],
  providers: [UserService, OauthService]
})
export class MySettingComponent {

    private userInfo = JSON.parse(this.cookieService.get('waves_user'));

    private renew = () => {
        this.userService.renew()
            .subscribe(
                () => {
                    if (this.userInfo == JSON.parse(this.cookieService.get('waves_user')))
                        setTimeout(this.renew, 500);
                    else
                        this.userInfo = JSON.parse(this.cookieService.get('waves_user'));
                }
            );
    };

    private connectTwitter:any = function() {
        window.open(this.Global.api + 'oauth/twitter?a=' + Math.floor(99999999999999999999 * Math.random()), '', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=600,height=400');
        this.renew();
    };

    private disconnectTwitter:any = function() {
        this.oauthService.disconnectTwitter()
            .subscribe(
                () => {
                    this.alertService.push('成功解除 Twitter 账户绑定。', 'success');
                    this.userInfo = JSON.parse(this.cookieService.get('waves_user'));
                }
            );
    }

    constructor(
        private cookieService: CookieService,
        private alertService: AlertService,
        private Global: GlobalService,
        private userService: UserService,
        private oauthService: OauthService
    ) {

    }
}
