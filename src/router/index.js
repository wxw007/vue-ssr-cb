import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// inject start
const routes = [
	{ path: "/", component: () => import("@/views/index.vue") },
	{ path: "/:areaSimpleName/n/b/500", component: () => import("@/views/_areaSimpleName/n/b/500.vue") },
	{ path: "/:areaSimpleName/n/m/area", component: () => import("@/views/_areaSimpleName/n/m/area.vue") },
	{
		path: "/:areaSimpleName/n/m", 
		component: () => import("@/views/_areaSimpleName/n/m/index.vue"),
		children: [
			{ path: "", component: () => import("@/views/_areaSimpleName/n/m/index/index.vue") },
			{ path: "symposium", component: () => import("@/views/_areaSimpleName/n/m/index/symposium.vue") }
		]
	},
	{ path: "/:areaSimpleName/n/m/search", component: () => import("@/views/_areaSimpleName/n/m/search.vue") },
	{ path: "/:areaSimpleName/n/m/info/flashnews", component: () => import("@/views/_areaSimpleName/n/m/info/flashnews/index.vue") },
	{ path: "/:areaSimpleName/n/m/info/subscription", component: () => import("@/views/_areaSimpleName/n/m/info/subscription/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/agreeMent", component: () => import("@/views/_areaSimpleName/n/m/life/agreeMent.vue") },
	{ path: "/:areaSimpleName/n/m/life", component: () => import("@/views/_areaSimpleName/n/m/life/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/search", component: () => import("@/views/_areaSimpleName/n/m/life/search.vue") },
	{ path: "/:areaSimpleName/n/m/life/foodservice/addView", component: () => import("@/views/_areaSimpleName/n/m/life/foodservice/addView.vue") },
	{ path: "/:areaSimpleName/n/m/life/foodservice", component: () => import("@/views/_areaSimpleName/n/m/life/foodservice/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/foodservice/search", component: () => import("@/views/_areaSimpleName/n/m/life/foodservice/search.vue") },
	{ path: "/:areaSimpleName/n/m/life/housingservice/addView", component: () => import("@/views/_areaSimpleName/n/m/life/housingservice/addView.vue") },
	{ path: "/:areaSimpleName/n/m/life/housingservice", component: () => import("@/views/_areaSimpleName/n/m/life/housingservice/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/housingservice/search", component: () => import("@/views/_areaSimpleName/n/m/life/housingservice/search.vue") },
	{ path: "/:areaSimpleName/n/m/life/jobservice/addView", component: () => import("@/views/_areaSimpleName/n/m/life/jobservice/addView.vue") },
	{ path: "/:areaSimpleName/n/m/life/jobservice", component: () => import("@/views/_areaSimpleName/n/m/life/jobservice/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/jobservice/search", component: () => import("@/views/_areaSimpleName/n/m/life/jobservice/search.vue") },
	{ path: "/:areaSimpleName/n/m/life/recruitservice/addView", component: () => import("@/views/_areaSimpleName/n/m/life/recruitservice/addView.vue") },
	{ path: "/:areaSimpleName/n/m/life/recruitservice", component: () => import("@/views/_areaSimpleName/n/m/life/recruitservice/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/recruitservice/search", component: () => import("@/views/_areaSimpleName/n/m/life/recruitservice/search.vue") },
	{ path: "/:areaSimpleName/n/m/life/selfdefiningservice/addView", component: () => import("@/views/_areaSimpleName/n/m/life/selfdefiningservice/addView.vue") },
	{ path: "/:areaSimpleName/n/m/life/selfdefiningservice", component: () => import("@/views/_areaSimpleName/n/m/life/selfdefiningservice/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/selfdefiningservice/search", component: () => import("@/views/_areaSimpleName/n/m/life/selfdefiningservice/search.vue") },
	{ path: "/:areaSimpleName/n/m/life/tongcityservice/addView", component: () => import("@/views/_areaSimpleName/n/m/life/tongcityservice/addView.vue") },
	{ path: "/:areaSimpleName/n/m/life/tongcityservice", component: () => import("@/views/_areaSimpleName/n/m/life/tongcityservice/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/tongcityservice/search", component: () => import("@/views/_areaSimpleName/n/m/life/tongcityservice/search.vue") },
	{ path: "/:areaSimpleName/n/m/life/travel", component: () => import("@/views/_areaSimpleName/n/m/life/travel/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/travel/search", component: () => import("@/views/_areaSimpleName/n/m/life/travel/search.vue") },
	{ path: "/:areaSimpleName/n/m/life/travelstrategy/hot", component: () => import("@/views/_areaSimpleName/n/m/life/travelstrategy/hot.vue") },
	{ path: "/:areaSimpleName/n/m/life/travelstrategy", component: () => import("@/views/_areaSimpleName/n/m/life/travelstrategy/index.vue") },
	{ path: "/:areaSimpleName/n/m/life/travelstrategy/search", component: () => import("@/views/_areaSimpleName/n/m/life/travelstrategy/search.vue") },
	{ path: "/:areaSimpleName/n/m/mine/areaSelect", component: () => import("@/views/_areaSimpleName/n/m/mine/areaSelect.vue") },
	{ path: "/:areaSimpleName/n/m/mine/confirm", component: () => import("@/views/_areaSimpleName/n/m/mine/confirm.vue") },
	{ path: "/:areaSimpleName/n/m/mine", component: () => import("@/views/_areaSimpleName/n/m/mine/index.vue") },
	{ path: "/:areaSimpleName/n/m/mine/life-publish-order", component: () => import("@/views/_areaSimpleName/n/m/mine/life-publish-order.vue") },
	{ path: "/:areaSimpleName/n/m/mine/login", component: () => import("@/views/_areaSimpleName/n/m/mine/login.vue") },
	{ path: "/:areaSimpleName/n/m/mine/collection", component: () => import("@/views/_areaSimpleName/n/m/mine/collection/index.vue") },
	{ path: "/:areaSimpleName/n/m/mine/history", component: () => import("@/views/_areaSimpleName/n/m/mine/history/index.vue") },
	{ path: "/:areaSimpleName/n/m/mine/travel-order", component: () => import("@/views/_areaSimpleName/n/m/mine/travel-order/index.vue") },
	{ path: "/:areaSimpleName/n/m/mine/travel-order/reply", component: () => import("@/views/_areaSimpleName/n/m/mine/travel-order/reply.vue") },
	{ path: "/:areaSimpleName/n/w/404", component: () => import("@/views/_areaSimpleName/n/w/404.vue") },
	{ path: "/:areaSimpleName/n/w", component: () => import("@/views/_areaSimpleName/n/w/index.vue") },
	{ path: "/:areaSimpleName/n/w/info/search", component: () => import("@/views/_areaSimpleName/n/w/info/search.vue") },
	{ path: "/:areaSimpleName/n/w/info/:id", component: () => import("@/views/_areaSimpleName/n/w/info/_id.vue") },
	{ path: "/:areaSimpleName/n/w/life", component: () => import("@/views/_areaSimpleName/n/w/life/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/queryListAllServiceByKeyword", component: () => import("@/views/_areaSimpleName/n/w/life/queryListAllServiceByKeyword.vue") },
	{ path: "/:areaSimpleName/n/w/life/foodservice/addView", component: () => import("@/views/_areaSimpleName/n/w/life/foodservice/addView.vue") },
	{ path: "/:areaSimpleName/n/w/life/foodservice", component: () => import("@/views/_areaSimpleName/n/w/life/foodservice/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/foodservice/search", component: () => import("@/views/_areaSimpleName/n/w/life/foodservice/search.vue") },
	{ path: "/:areaSimpleName/n/w/life/foodservice/:id", component: () => import("@/views/_areaSimpleName/n/w/life/foodservice/_id.vue") },
	{ path: "/:areaSimpleName/n/w/life/housingservice/addView", component: () => import("@/views/_areaSimpleName/n/w/life/housingservice/addView.vue") },
	{ path: "/:areaSimpleName/n/w/life/housingservice", component: () => import("@/views/_areaSimpleName/n/w/life/housingservice/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/housingservice/search", component: () => import("@/views/_areaSimpleName/n/w/life/housingservice/search.vue") },
	{ path: "/:areaSimpleName/n/w/life/housingservice/:id", component: () => import("@/views/_areaSimpleName/n/w/life/housingservice/_id.vue") },
	{ path: "/:areaSimpleName/n/w/life/jobservice/addView", component: () => import("@/views/_areaSimpleName/n/w/life/jobservice/addView.vue") },
	{ path: "/:areaSimpleName/n/w/life/jobservice", component: () => import("@/views/_areaSimpleName/n/w/life/jobservice/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/jobservice/search", component: () => import("@/views/_areaSimpleName/n/w/life/jobservice/search.vue") },
	{ path: "/:areaSimpleName/n/w/life/jobservice/:id", component: () => import("@/views/_areaSimpleName/n/w/life/jobservice/_id.vue") },
	{ path: "/:areaSimpleName/n/w/life/publish/agreement", component: () => import("@/views/_areaSimpleName/n/w/life/publish/agreement.vue") },
	{ path: "/:areaSimpleName/n/w/life/publish", component: () => import("@/views/_areaSimpleName/n/w/life/publish/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/publish/test", component: () => import("@/views/_areaSimpleName/n/w/life/publish/test.vue") },
	{ path: "/:areaSimpleName/n/w/life/publish/result/result", component: () => import("@/views/_areaSimpleName/n/w/life/publish/result/result.vue") },
	{ path: "/:areaSimpleName/n/w/life/recruitservice/addView", component: () => import("@/views/_areaSimpleName/n/w/life/recruitservice/addView.vue") },
	{ path: "/:areaSimpleName/n/w/life/recruitservice", component: () => import("@/views/_areaSimpleName/n/w/life/recruitservice/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/recruitservice/search", component: () => import("@/views/_areaSimpleName/n/w/life/recruitservice/search.vue") },
	{ path: "/:areaSimpleName/n/w/life/recruitservice/:id", component: () => import("@/views/_areaSimpleName/n/w/life/recruitservice/_id.vue") },
	{ path: "/:areaSimpleName/n/w/life/selfdefiningservice/addView", component: () => import("@/views/_areaSimpleName/n/w/life/selfdefiningservice/addView.vue") },
	{ path: "/:areaSimpleName/n/w/life/selfdefiningservice", component: () => import("@/views/_areaSimpleName/n/w/life/selfdefiningservice/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/selfdefiningservice/search", component: () => import("@/views/_areaSimpleName/n/w/life/selfdefiningservice/search.vue") },
	{ path: "/:areaSimpleName/n/w/life/selfdefiningservice/:id", component: () => import("@/views/_areaSimpleName/n/w/life/selfdefiningservice/_id.vue") },
	{ path: "/:areaSimpleName/n/w/life/tongcityservice/addView", component: () => import("@/views/_areaSimpleName/n/w/life/tongcityservice/addView.vue") },
	{ path: "/:areaSimpleName/n/w/life/tongcityservice", component: () => import("@/views/_areaSimpleName/n/w/life/tongcityservice/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/tongcityservice/search", component: () => import("@/views/_areaSimpleName/n/w/life/tongcityservice/search.vue") },
	{ path: "/:areaSimpleName/n/w/life/tongcityservice/:id", component: () => import("@/views/_areaSimpleName/n/w/life/tongcityservice/_id.vue") },
	{ path: "/:areaSimpleName/n/w/life/travel", component: () => import("@/views/_areaSimpleName/n/w/life/travel/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/travel/:id", component: () => import("@/views/_areaSimpleName/n/w/life/travel/_id.vue") },
	{ path: "/:areaSimpleName/n/w/life/travelstrategy", component: () => import("@/views/_areaSimpleName/n/w/life/travelstrategy/index.vue") },
	{ path: "/:areaSimpleName/n/w/life/travelstrategy/:id", component: () => import("@/views/_areaSimpleName/n/w/life/travelstrategy/_id.vue") },
	{ path: "/:areaSimpleName/n/w/membercenter/avatar-edit", component: () => import("@/views/_areaSimpleName/n/w/membercenter/avatar-edit.vue") },
	{ path: "/:areaSimpleName/n/w/membercenter/edit", component: () => import("@/views/_areaSimpleName/n/w/membercenter/edit.vue") },
	{ path: "/:areaSimpleName/n/w/membercenter", component: () => import("@/views/_areaSimpleName/n/w/membercenter/index.vue") },
	{ path: "/:areaSimpleName/n/w/membercenter/message", component: () => import("@/views/_areaSimpleName/n/w/membercenter/message.vue") },
	{ path: "/:areaSimpleName/n/w/membercenter/order", component: () => import("@/views/_areaSimpleName/n/w/membercenter/order.vue") },
	{ path: "/:areaSimpleName/n/w/more/about-us", component: () => import("@/views/_areaSimpleName/n/w/more/about-us.vue") },
	{ path: "/:areaSimpleName/n/w/more/contact-us", component: () => import("@/views/_areaSimpleName/n/w/more/contact-us.vue") },
	{ path: "/:areaSimpleName/n/w/symposium", component: () => import("@/views/_areaSimpleName/n/w/symposium/index.vue") },
	{ path: "/:areaSimpleName/n/w/symposium/:id", component: () => import("@/views/_areaSimpleName/n/w/symposium/_id.vue") },
	{ path: "/:areaSimpleName/n/w/taginfo/:id", component: () => import("@/views/_areaSimpleName/n/w/taginfo/_id.vue") }
];
// inject end



export function createRouter () {
	return new Router({
		mode: 'history',
		fallback: false,
		scrollBehavior (to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition
			} else {
				return { x: 0, y: 0 }
			}
		},
		// scrollBehavior: () => ({ y: 0 }),
		routes: routes
	})
}