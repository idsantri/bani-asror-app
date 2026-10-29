import Report from 'src/models/Report';
import { routerInstance as router } from 'src/router';

async function checkIntroduction(userId) {
	const response = await Report.getIntroductionByUserId(userId);
	if (response?.data?.reports?.length) return true;
	return false;
}

async function redirectLogin(memberId, userId) {
	if (memberId) {
		router.push(`/members/${memberId}`);
		return;
	}
	const check = await checkIntroduction(userId);
	router.push(check ? '/' : '/profile');
}

export { redirectLogin };
