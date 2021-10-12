import { PageHeadings } from '../components/PageHeadings'
import { useAuth } from '../providers/AuthProvider'

export const PageHeadingsCluster = () => {
  const { user, isLogIn } = useAuth()
  if (isLogIn) {
    return <PageHeadings isLogin={true} address={user!.addr}></PageHeadings>
  } else {
    return <PageHeadings isLogin={false} address={null}></PageHeadings>
  }
}
