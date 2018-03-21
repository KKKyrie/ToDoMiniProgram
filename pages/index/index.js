//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		titleWording: '没有',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		initLoading: true,
		showDoneList: false,
		todoList: []
	},

	onLoad: function() {
		this.initUserInfo();
		this.getTodoList();
	},

	onShow: function() {
		this.turnOffLoading();
	},

	// 下拉刷新
	onPullDownRefresh: function() {
		// 重新获取页面数据
		setTimeout(() => {
			wx.stopPullDownRefresh();
		}, 1500);

	},

	// 按钮事件 获取用户数据
	getUserInfo: function(e) {
		app.globalData.userInfo = e.detail.userInfo;
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		});
	},

	getTodoList: function() {
		let todoList = app.globalData.todoList;
		this.setData({
			todoList: todoList
		});
	},

	// 关闭小程序loading动画
	turnOffLoading: function() {

		setTimeout(() => {
			this.setData({
				initLoading: false
			})
		}, 1500)
	},

	// 初始化用户数据
	initUserInfo: function() {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			});
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				});
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					});
				}
			});
		}
	},


	// 去添加页面
	goAddPage: function() {
		wx.navigateTo({
			url: '../addItem/addItem'
		});
	},


	// todo详情页
	navigateToDetail: function(ev) {

		let todo = ev.target.dataset.todo;
		let remark = ev.target.dataset.remark;

		let jumpUrl = '../itemDetail/itemDetail?todo=' + todo + '&remark=' + remark;

		wx.navigateTo({
			url: jumpUrl
		});
	},


	// 展示未完成列表
	switchUndoneList: function() {
		this.setData({
			showDoneList: false
		});
	},

	// 展示完成列表
	switchDoneList: function() {
		this.setData({
			showDoneList: true
		});
	}
})