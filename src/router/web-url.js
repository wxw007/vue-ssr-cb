import { resolveUrl } from "../util/common/url"
export default {
    page404 (pageUrl) {
        return resolveUrl(pageUrl, "/n/w/404")
    }
}