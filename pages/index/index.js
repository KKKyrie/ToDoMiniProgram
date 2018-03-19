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
		todoList: [{
			key: 'key_0',
			todo: 'mock_0未完成',
			isDone: false,
			remark: '展示未完成'
		},{
			key: 'key_1',
			todo: 'mock_1未完成',
			isDone: false,
			remark: '展示未完成'
		},{
			key: 'key_2',
			todo: 'mock_2 已完成',
			isDone: true,
			remark: '展示已完成'
		}]
	},
	//事件处理函数
	bindViewTap: function() {
		console.log('tap avatar');
	},

	onLoad: function() {
		this.initUserInfo();
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
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
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
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},


	// 去添加页面
	goAddPage: function() {
		wx.showModal({
			title: '友情提醒',
			content: '添加事项的页面还没做呢，别点了',
			showCancel: false,
			confirmText: '哦',
			confirmColor: '#5cbaea',
			success: res => {
				if (res.confirm) {
					return;
				}
			}
		});
	},


	// 展示未完成列表
	switchUndoneList: function(){
		this.setData({
			showDoneList: false
		});
	},

	// 展示完成列表
	switchDoneList: function(){
		this.setData({
			showDoneList: true
		});
	}
})