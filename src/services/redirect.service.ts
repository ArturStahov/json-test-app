import { Pages } from '@/constants/pages';
import { getAppInstance } from './common.service';

type paramsType = { [key: string] : string }
type queryType = { [key: string]: string }
type pageType = Pages.Auth | Pages.BOARD

export function redirectTo(pageName: pageType, params = {} as paramsType, query = {} as queryType ) {
  const instance = getAppInstance();
  const router = instance.$router;
  const route = instance.$route;
 
  router.push({
    name: pageName,
    query: {
      ...route.query,
      ...query,
    },
    params: {
      ...params
    }
  }).catch(() => {
    console.log('Error redirect')
  })
}

export default { redirectTo }