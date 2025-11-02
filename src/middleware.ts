import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for
  // - … if they start with `/admin`, `/api`, `/next`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!admin|api|media|next|_next|_vercel|.*\\..*).*)',
}
