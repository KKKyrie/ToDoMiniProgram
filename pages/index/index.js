//index.js
//获取应用实例
const app = getApp();

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
		let that = this;
		setTimeout(function() {
			that.getTodoListFromStorage();
			wx.stopPullDownRefresh();
		}, 1000);
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

	getTodoListFromStorage: function() {
		let storage = wx.getStorageSync('userTodoList');
		let todoList = storage ? JSON.parse(storage) : [];
		app.globalData.todoList = todoList;
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
		let todoList = this.data.todoList;
		let undoneList = todoList.filter(function(item){
			return !item.isDone;
		});
		let length = undoneList.length;
		if (length > 4) {
			wx.showModal({
				title: '提示',
				content: '先做完这5个吧  : )',
				showCancel: false,
				confirmText: '好嘞',
				confirmColor: '#5cbaea'
			})
			return;
		}

		wx.navigateTo({
			url: '../addItem/addItem'
		});
	},


	// todo详情页
	navigateToDetail: function(ev) {

		let dataset = ev.currentTarget.dataset;
		let todo = encodeURIComponent(dataset.todo);
		let remark = encodeURIComponent(dataset.remark);
		let stamp = encodeURIComponent(dataset.stamp);

		let jumpUrl = '../todoDetail/todoDetail?todo=' + todo + '&remark=' + remark + '&stamp=' + stamp;

		wx.navigateTo({
			url: jumpUrl
		});
	},

	// 已完成 todo详情页
	navigateToDoneDetail: function(ev) {

		let dataset = ev.currentTarget.dataset;
		let todo = encodeURIComponent(dataset.todo);
		let remark = encodeURIComponent(dataset.remark);
		let stamp = encodeURIComponent(dataset.stamp);

		let jumpUrl = '../doneDetail/doneDetail?todo=' + todo + '&remark=' + remark + '&stamp=' + stamp;

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