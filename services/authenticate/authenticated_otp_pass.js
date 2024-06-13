import { callAuthenOTPPass} from "../api/api_otp";

import { getAccessToken, getEncrypted, removeEncrypted } from '../../asyncStorage/auth';

const handleAuthenticatedOTPPass = async (otp) => {
	const access_token = await getAccessToken();
	const encrypted = await getEncrypted();

	const response = await callAuthenOTPPass({ otp: otp, encrypted: encrypted, token: access_token });
	const data = await response.json();
	const { message, code } = data;
	if (response.ok && code === '200') {
		console.log(message);
		await removeEncrypted();
		return true;
	} else {
		console.log(message);
		return false;
	}
}

export { handleAuthenticatedOTPPass }