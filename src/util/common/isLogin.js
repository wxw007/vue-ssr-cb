import { checkIsLogin } from '@/api/wei'
export const isLogin = (go) => {
	var href = window.location.href,
		prefixUrl = href.split('life')[0],
		loginUrl = prefixUrl + 'mine/login';

    checkIsLogin().then(response => {
        let result = response.data;
        if (result.success) {
            if (result.msg == '0') {
                window.location.href = loginUrl;
            }
            if (result.msg == '1') {
                go();
            }
        }
    })
}